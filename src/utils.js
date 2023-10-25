const Eris = require("eris");
const bot = require("./bot");
const moment = require("moment");
const humanizeDuration = require("humanize-duration");
const publicIp = require("public-ip");
const config = require("./cfg");
const { BotError } = require("./BotError");

const userMentionRegex = /^<@!?([0-9]+?)>$/;

let inboxGuild = null;
let mainGuilds = [];
let logChannel = null;

/**
 * @returns {Eris~Guild}
 */
function getInboxGuild() {
  if (! inboxGuild) inboxGuild = bot.guilds.find(g => g.id === config.inboxServerId);
  if (! inboxGuild) throw new BotError("The bot is not on the inbox server!");
  return inboxGuild;
}

/**
 * @returns {Eris~Guild[]}
 */
function getMainGuilds() {
  if (mainGuilds.length === 0) {
    mainGuilds = bot.guilds.filter(g => config.mainServerId.includes(g.id));
  }

  if (mainGuilds.length !== config.mainServerId.length) {
    if (config.mainServerId.length === 1) {
      console.warn("[WARN] The bot hasn't joined the main guild!");
    } else {
      console.warn("[WARN] The bot hasn't joined one or more main guilds!");
    }
  }

  return mainGuilds;
}

/**
 * @returns {Eris~TextChannel}
 */
function getLogChannel() {
  const _inboxGuild = getInboxGuild();
  const _logChannel = _inboxGuild.channels.get(config.logChannelId);

  if (! _logChannel) {
    throw new BotError("Log channel (logChannelId) not found!");
  }

  if (! (_logChannel instanceof Eris.TextChannel)) {
    throw new BotError("Make sure the logChannelId option is set to a text channel!");
  }

  return _logChannel;
}

function postLog(...args) {
  return getLogChannel().createMessage(...args);
}

function postError(channel, str, opts = {}) {
  return channel.createMessage({
    ...opts,
    content: `⚠ ${str}`
  });
}

/**
 * @param {Eris.Member} member
 * @returns {boolean}
 */
function isStaff(member) {
  if (! member) return false;
  if (config.inboxServerPermission.length === 0) return true;
  if (member.guild.ownerID === member.id) return true;

  return config.inboxServerPermission.some(perm => {
    if (isSnowflake(perm)) {
      if (member.id === perm) return true;
      if (member.roles.includes(perm)) return true;
    } else {
      return member.permission.has(perm);
    }

    return false;
  });
}

/**
 * @param {Eris.Client} client
 * @param {Eris.Message} msg
 * @returns {Promise<boolean>}
 */
async function messageIsOnInboxServer(client, msg) {
  const channel = await getOrFetchChannel(client, msg.channel.id);
  if (! channel.guild) return false;
  if (channel.guild.id !== getInboxGuild().id) return false;
  return true;
}

/**
 * @param {Eris.Client} client
 * @param {Eris.Message} msg
 * @returns {Promise<boolean>}
 */
async function messageIsOnMainServer(client, msg) {
  const channel = await getOrFetchChannel(client, msg.channel.id);
  if (! channel || ! channel.guild) return false;

  return getMainGuilds()
    .some(g => channel.guild.id === g.id);
}

/**
 * @param {Eris.Attachment} attachment
 * @param {string} attachmentUrl
 * @returns {Promise<string>}
 */
async function formatAttachment(attachment, attachmentUrl) {
  let filesize = attachment.size || 0;
  filesize /= 1024;

  return `**Attachment:** ${attachment.filename} (${filesize.toFixed(1)}KB)\n${attachmentUrl}`;
}

/**
 * @param {String} str
 * @returns {String|null}
 */
function getUserMention(str) {
  if (! str) return null;

  str = str.trim();

  if (isSnowflake(str)) {
    // User ID
    return str;
  } else {
    let mentionMatch = str.match(userMentionRegex);
    if (mentionMatch) return mentionMatch[1];
  }

  return null;
}

/**
 * @param {...Parameters<typeof moment>>} momentArgs
 * @returns {String}
 */
function getTimestamp(...momentArgs) {
  return moment.utc(...momentArgs).format("HH:mm");
}

/**
 * @param {String} str
 * @returns {String}
 */
function disableLinkPreviews(str) {
  return str.replace(/(^|[^<])(https?:\/\/\S+)/ig, "$1<$2>");
}

/**
 * @param {String} path
 * @returns {Promise<String>}
 */
async function getSelfUrl(path = "") {
  if (config.url) {
    return `${config.url}/${path}`;
  } else {
    const port = config.port || 8890;
    const ip = await publicIp.v4();
    return `http://${ip}:${port}/${path}`;
  }
}

/**
 * @param {Eris~Member} member
 * @returns {Eris~Role}
 */
function getMainRole(member) {
  const roles = member.roles.map(id => member.guild.roles.get(id));
  roles.sort((a, b) => a.position > b.position ? -1 : 1);
  return roles.find(r => r.hoist);
}

/**
 * @param {Array|String} items
 * @param {Number} chunkSize
 * @returns {Array}
 */
function chunk(items, chunkSize) {
  const result = [];

  for (let i = 0; i < items.length; i += chunkSize) {
    result.push(items.slice(i, i + chunkSize));
  }

  return result;
}

/**
 * @param {String} str
 * @returns {String}
 */
function trimAll(str) {
  return str
    .split("\n")
    .map(_str => _str.trim())
    .join("\n");
}

const delayStringRegex = /^([0-9]+)(?:([dhms])[a-z]*)?/i;

/**
 * @param {String} str
 * @returns {Number|null}
 */
function convertDelayStringToMS(str) {
  let match;
  let ms = 0;

  str = str.trim();

  while (str !== "" && (match = str.match(delayStringRegex)) !== null) {
    if (match[2] === "d") ms += match[1] * 1000 * 60 * 60 * 24;
    else if (match[2] === "h") ms += match[1] * 1000 * 60 * 60;
    else if (match[2] === "s") ms += match[1] * 1000;
    else if (match[2] === "m" || ! match[2]) ms += match[1] * 1000 * 60;

    str = str.slice(match[0].length);
  }

  if (str !== "") {
    return null;
  }

  return ms;
}

/**
 * @param {string|string[]} mentionRoles
 * @returns {string[]}
 */
function getValidMentionRoles(mentionRoles) {
  if (! Array.isArray(mentionRoles)) {
    mentionRoles = [mentionRoles];
  }

  return mentionRoles.filter(roleStr => {
    return (roleStr !== null && roleStr !== "none" && roleStr !== "off" && roleStr !== "");
  });
}

/**
 * @param {string[]} mentionRoles
 * @returns {string}
 */
function mentionRolesToMention(mentionRoles) {
  const mentions = [];
  for (const role of mentionRoles) {
    if (role === "here") mentions.push("@here");
    else if (role === "everyone") mentions.push("@everyone");
    else mentions.push(`<@&${role}>`);
  }
  return mentions.join(" ") + " ";
}

/**
 * @returns {string}
 */
function getInboxMention() {
  const mentionRoles = getValidMentionRoles(config.mentionRole);
  return mentionRolesToMention(mentionRoles);
}

/**
 * @param {string[]} mentionRoles
 * @returns {object}
 */
function mentionRolesToAllowedMentions(mentionRoles) {
  const allowedMentions = {
    everyone: false,
    roles: [],
  };

  for (const role of mentionRoles) {
    if (role === "here" || role === "everyone") allowedMentions.everyone = true;
    else allowedMentions.roles.push(role);
  }

  return allowedMentions;
}

/**
 * @returns {object}
 */
function getInboxMentionAllowedMentions() {
  const mentionRoles = getValidMentionRoles(config.mentionRole);
  return mentionRolesToAllowedMentions(mentionRoles);
}

function postSystemMessageWithFallback(channel, thread, text) {
  if (thread) {
    thread.postSystemMessage(text);
  } else {
    channel.createMessage(text);
  }
}

/**
 * @param {Object} target
 * @param {Object} props
 */
function setDataModelProps(target, props) {
  for (const prop in props) {
    if (! props.hasOwnProperty(prop)) continue;
    if (props[prop] instanceof Date) {
      if (props[prop].getUTCFullYear() === 1970) {
        target[prop] = null;
      } else {
        target[prop] = moment.utc(props[prop]).format("YYYY-MM-DD HH:mm:ss");
      }
    } else {
      target[prop] = props[prop];
    }
  }
}

const snowflakeRegex = /^[0-9]{17,}$/;
function isSnowflake(str) {
  return str && snowflakeRegex.test(str);
}

const humanizeDelay = (delay, opts = {}) => humanizeDuration(delay, Object.assign({conjunction: " and "}, opts));

const markdownCharsRegex = /([\\_*|`~])/g;
function escapeMarkdown(str) {
  return str.replace(markdownCharsRegex, "\\$1");
}

function disableInlineCode(str) {
  return str.replace(/`/g, "'");
}

function disableCodeBlocks(str) {
  return str.replace(/`/g, "`\u200b");
}

function readMultilineConfigValue(str) {
  return Array.isArray(str) ? str.join("\n") : str;
}

function noop() {}

const MAX_MESSAGE_CONTENT_LENGTH = 2000;

const MAX_EMBED_CONTENT_LENGTH = 6000;

/**
 *
 * @param {string|Eris.MessageContent} content
 */
function messageContentIsWithinMaxLength(content) {
  if (typeof content === "string") {
    content = { content };
  }

  if (content.content && content.content.length > MAX_MESSAGE_CONTENT_LENGTH) {
    return false;
  }

  if (content.embed) {
    let embedContentLength = 0;

    if (content.embed.title) embedContentLength += content.embed.title.length;
    if (content.embed.description) embedContentLength += content.embed.description.length;
    if (content.embed.footer && content.embed.footer.text) {
      embedContentLength += content.embed.footer.text.length;
    }
    if (content.embed.author && content.embed.author.name) {
      embedContentLength += content.embed.author.name.length;
    }

    if (content.embed.fields) {
      for (const field of content.embed.fields) {
        if (field.title) embedContentLength += field.name.length;
        if (field.description) embedContentLength += field.value.length;
      }
    }

    if (embedContentLength > MAX_EMBED_CONTENT_LENGTH) {
      return false;
    }
  }

  return true;
}

/**
 * @param {string} str
 * @param {number} [maxChunkLength=2000]
 * @returns {string[]}
 */
function chunkByLines(str, maxChunkLength = 2000) {
  if (str.length < maxChunkLength) {
    return [str];
  }

  const chunks = [];

  while (str.length) {
    if (str.length <= maxChunkLength) {
      chunks.push(str);
      break;
    }

    const slice = str.slice(0, maxChunkLength);

    const lastLineBreakIndex = slice.lastIndexOf("\n");
    if (lastLineBreakIndex === -1) {
      chunks.push(str.slice(0, maxChunkLength));
      str = str.slice(maxChunkLength);
    } else {
      chunks.push(str.slice(0, lastLineBreakIndex));
      str = str.slice(lastLineBreakIndex + 1);
    }
  }

  return chunks;
}

/**
 */
function chunkMessageLines(str, maxChunkLength = 1990) {
  const chunks = chunkByLines(str, maxChunkLength);
  let openCodeBlock = false;

  return chunks.map(_chunk => {
    if (_chunk[0] === "\n") _chunk = "\u200b" + _chunk;
    if (_chunk[_chunk.length - 1] === "\n") _chunk = _chunk + "\u200b";
    if (openCodeBlock) {
      openCodeBlock = false;
      if (_chunk.startsWith("```")) {
        _chunk = _chunk.slice(3);
      } else {
        _chunk = "```" + _chunk;
      }
    }
    const codeBlockDelimiters = _chunk.match(/```/g);
    if (codeBlockDelimiters && codeBlockDelimiters.length % 2 !== 0) {
      _chunk += "```";
      openCodeBlock = true;
    }

    return _chunk;
  });
}

/**
 * @type {Record<string, Promise<Eris.AnyChannel | null>>}
 */
const fetchChannelPromises = {};

/**
 * @param {Eris.Client} client
 * @param {string} channelId
 * @returns {Promise<Eris.AnyChannel | null>}
 */
async function getOrFetchChannel(client, channelId) {
  const cachedChannel = client.getChannel(channelId);
  if (cachedChannel) {
    return cachedChannel;
  }

  if (! fetchChannelPromises[channelId]) {
    fetchChannelPromises[channelId] = (async () => {
      const channel = client.getRESTChannel(channelId);
      if (! channel) {
        return null;
      }

      if (channel instanceof Eris.ThreadChannel) {
        channel.guild.threads.add(channel);
        client.threadGuildMap[channel.id] = channel.guild.id;
      } else if (channel instanceof Eris.GuildChannel) {
        channel.guild.channels.add(channel);
        client.channelGuildMap[channel.id] = channel.guild.id;
      } else if (channel instanceof Eris.PrivateChannel) {
        client.privateChannels.add(channel);
      } else if (channel instanceof Eris.GroupChannel) {
        client.groupChannels.add(channel);
      }

      return channel;
    })();
  }

  return fetchChannelPromises[channelId];
}

/**
 * @param {Eris.MessageContent} content
 * @returns {Eris.AdvancedMessageContent}
 */
function messageContentToAdvancedMessageContent(content) {
  return typeof content === "string" ? { content } : content;
}

const START_CODEBLOCK = "```";
const END_CODEBLOCK = "```";

module.exports = {
  getInboxGuild,
  getMainGuilds,
  getLogChannel,
  postError,
  postLog,

  isStaff,
  messageIsOnInboxServer,
  messageIsOnMainServer,

  formatAttachment,

  getUserMention,
  getTimestamp,
  disableLinkPreviews,
  getSelfUrl,
  getMainRole,
  delayStringRegex,
  convertDelayStringToMS,

  getValidMentionRoles,
  mentionRolesToMention,
  getInboxMention,
  mentionRolesToAllowedMentions,
  getInboxMentionAllowedMentions,

  postSystemMessageWithFallback,

  chunk,
  trimAll,

  setDataModelProps,

  isSnowflake,

  humanizeDelay,

  escapeMarkdown,
  disableInlineCode,
  disableCodeBlocks,

  readMultilineConfigValue,

  messageContentIsWithinMaxLength,
  chunkMessageLines,

  messageContentToAdvancedMessageContent,

  getOrFetchChannel,

  noop,

  START_CODEBLOCK,
  END_CODEBLOCK,
};
