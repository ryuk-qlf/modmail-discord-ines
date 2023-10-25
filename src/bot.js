const Eris = require("eris");
const config = require("./cfg");

const intents = [
  "guildMembers", 

  "directMessages",
  "guildMessages",
  "guilds",
  "guildVoiceStates", 
  "guildMessageTyping",
  "directMessageTyping",
  "guildBans", 

  ...config.extraIntents,
];

const bot = new Eris.Client(config.token, {
  restMode: true,
  intents: Array.from(new Set(intents)),
  allowedMentions: {
    everyone: false,
    roles: false,
    users: false,
  },
});

const SAFE_TO_IGNORE_ERROR_CODES = [
  1001, 
  1006, 
  "ECONNRESET", 
];

bot.on("error", err => {
  if (SAFE_TO_IGNORE_ERROR_CODES.includes(err.code)) {
    return;
  }

  throw err;
});

/**
 * @type {Eris.Client}
 */
module.exports = bot;
