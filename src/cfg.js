const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");
const schema = require("./data/cfg.schema.json");
const cliOpts = require("./cliOpts");

/** @type {ModmailConfig} */
let config = {};

const configFilesToSearch = [
  "config.ini",
  "config.json",
  "config.json5",
  "config.js",

  "config.ini.ini",
  "config.ini.txt",
  "config.json.json",
  "config.json.txt",
  "config.json.ini",
];

let configFileToLoad;

const requestedConfigFile = cliOpts.config || cliOpts.c;
if (requestedConfigFile) {
  try {
    fs.accessSync(requestedConfigFile);
    configFileToLoad = requestedConfigFile;
  } catch (e) {
    if (e.code === "ENOENT") {
      console.error(`Specified config file was not found: ${requestedConfigFile}`);
    } else {
      console.error(`Error reading specified config file ${requestedConfigFile}: ${e.message}`);
    }

    process.exit(1);
  }
} else {
  for (const configFile of configFilesToSearch) {
    try {
      const relativePath = path.relative(process.cwd(), path.resolve(__dirname, "..", configFile));
      fs.accessSync(relativePath);
      configFileToLoad = relativePath;
      break;
    } catch (e) {}
  }
}

if (configFileToLoad) {
  const srcRelativePath = path.resolve(__dirname, process.cwd(), configFileToLoad);
  console.log(`Loading configuration from ${configFileToLoad}...`);

  try {
    if (configFileToLoad.endsWith(".js")) {
      config = require(srcRelativePath);
    } else {
      const raw = fs.readFileSync(configFileToLoad, {encoding: "utf8"});
      if (configFileToLoad.endsWith(".ini") || configFileToLoad.endsWith(".ini.txt")) {
        config = require("ini").decode(raw);
      } else {
        config = require("json5").parse(raw);
      }
    }
  } catch (e) {
    throw new Error(`Error reading config file! The error given was: ${e.message}`);
  }
}

config.dbDir = path.join(__dirname, "..", "db");
config.logDir = path.join(__dirname, "..", "logs");

require("dotenv").config();

const envKeyPrefix = "MM_";
let loadedEnvValues = 0;

for (const [key, value] of Object.entries(process.env)) {
  if (! key.startsWith(envKeyPrefix)) continue;

  const configKey = key.slice(envKeyPrefix.length)
    .toLowerCase()
    .replace(/([a-z])_([a-z])/g, (m, m1, m2) => `${m1}${m2.toUpperCase()}`)
    .replace("__", ".");

  config[configKey] = value.includes("||")
    ? value.split("||")
    : value;

  loadedEnvValues++;
}

if (process.env.PORT && ! process.env.MM_PORT) {
  config.port = process.env.PORT;
  loadedEnvValues++;
}

if (loadedEnvValues > 0) {
  console.log(`Loaded ${loadedEnvValues} ${loadedEnvValues === 1 ? "value" : "values"} from environment variables`);
}

for (const [key, value] of Object.entries(config)) {
  if (! key.includes(".")) continue;

  const keys = key.split(".");
  let cursor = config;
  for (let i = 0; i < keys.length; i++) {
    if (i === keys.length - 1) {
      cursor[keys[i]] = value;
    } else {
      cursor[keys[i]] = cursor[keys[i]] || {};
      cursor = cursor[keys[i]];
    }
  }

  delete config[key];
}

if (config.mainGuildId && ! config.mainServerId) {
  config.mainServerId = config.mainGuildId;
}
if (config.mailGuildId && ! config.inboxServerId) {
  config.inboxServerId = config.mailGuildId;
}

if (! config.dbType) {
  config.dbType = "sqlite";
}

if (! config.sqliteOptions) {
  config.sqliteOptions = {
    filename: path.resolve(__dirname, "..", "db", "data.sqlite"),
  };
}

if (! config.logOptions) {
  config.logOptions = {};
}

config.categoryAutomation = config.categoryAutomation || {};
if (config.categoryAutomation && config.categoryAutomation.newThreadFromGuild && ! config.categoryAutomation.newThreadFromServer) {
  config.categoryAutomation.newThreadFromServer = config.categoryAutomation.newThreadFromGuild;
}

if (config.guildGreetings && ! config.serverGreetings) {
  config.serverGreetings = config.guildGreetings;
}

config.serverGreetings = config.serverGreetings || {};
if (config.greetingMessage || config.greetingAttachment) {
  for (const guildId of config.mainServerId) {
    if (config.serverGreetings[guildId]) continue;
    config.serverGreetings[guildId] = {
      message: config.greetingMessage,
      attachment: config.greetingAttachment
    };
  }
}

if (config.newThreadCategoryId) {
  config.categoryAutomation = config.categoryAutomation || {};
  config.categoryAutomation.newThread = config.newThreadCategoryId;
  delete config.newThreadCategoryId;
}

for (const [key, value] of Object.entries(config)) {
  if (value === "") {
    delete config[key];
  }
}

const ajv = new Ajv({
  useDefaults: true,
  coerceTypes: "array",
  allowUnionTypes: true,
});

/**
 * @param {string[]} errors
 * @returns void
 */
function exitWithConfigurationErrors(errors) {
  console.error("");
  console.error("NOTE! Issues with configuration:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  console.error("");
  console.error("Please restart the bot after fixing the issues mentioned above.");
  console.error("");

  process.exit(1);
}

const truthyValues = ["1", "true", "on", "yes"];
const falsyValues = ["0", "false", "off", "no"];
ajv.addKeyword({
  keyword: "coerceBoolean",
  compile() {
    return (value, ctx) => {
      if (! value) {
        return true;
      }

      const realValue = ctx.parentData[ctx.parentDataProperty];

      if (typeof realValue === "boolean") {
        return true;
      }

      if (truthyValues.includes(realValue)) {
        ctx.parentData[ctx.parentDataProperty] = true;
      } else if (falsyValues.includes(realValue)) {
        ctx.parentData[ctx.parentDataProperty] = false;
      } else {
        return false;
      }

      return true;
    };
  },
});

ajv.addKeyword({
  keyword: "multilineString",
  compile() {
    return (value, ctx) => {
      if (! value) {
        return true;
      }

      const realValue = ctx.parentData[ctx.parentDataProperty];
      if (typeof realValue === "string") {
        return true;
      }

      ctx.parentData[ctx.parentDataProperty] = realValue.join("\n");

      return true;
    };
  },
});

const validate = ajv.compile(schema);
const configIsValid = validate(config);
if (! configIsValid) {
  const errors = validate.errors.map(error => {
    if (error.params.missingProperty) {
      return `Missing required option: "${error.params.missingProperty.slice(1)}"`;
    } else {
      return `The "${error.instancePath.slice(1)}" option ${error.message}. (Is currently: ${typeof config[error.instancePath.slice(1)]})`;
    }
  });
  exitWithConfigurationErrors(errors);
}

const validStreamingUrlRegex = /^https:\/\/(www\.)?twitch.tv\/[a-z\d_\-]+\/?$/i;
if (config.statusType === "streaming") {
  if (! validStreamingUrlRegex.test(config.statusUrl)) {
    exitWithConfigurationErrors([
      "When statusType is set to \"streaming\", statusUrl must be set to a valid Twitch channel URL, such as https://www.twitch.tv/Dragory",
    ]);
  }
}

console.log("Configuration ok!");

/**
 * @type {ModmailConfig}
 */
module.exports = config;
