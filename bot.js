'use strict';

const {
  Client,
  Events,
  GatewayIntentBits,
} = require('discord.js');

const token = process.env.DISCORD_TOKEN;
const prefix = process.env.COMMAND_PREFIX || '!';

if (!token) {
  console.error(
    'Missing DISCORD_TOKEN. Set it as an environment variable before starting the bot.'
  );
  process.exit(1);
}

if (prefix.length > 5 || /\s/.test(prefix)) {
  console.error('COMMAND_PREFIX must be 1–5 non-whitespace characters.');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const commands = new Map([
  ['ping', async (message) => {
    await message.reply(`Pong! Gateway latency: ${client.ws.ping}ms`);
  }],
  ['welcome', async (message) => {
    await message.reply('Greetings! Welcome to the server.');
  }],
  ['help', async (message) => {
    await message.reply([
      '**VirtualBot commands**',
      `\`${prefix}ping\` — Check whether the bot is online.`,
      `\`${prefix}welcome\` — Receive a welcome message.`,
      `\`${prefix}help\` — Show this help message.`,
    ].join('\n'));
  }],
]);

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  console.log(`Command prefix: ${prefix}`);
});

client.on(Events.MessageCreate, async (message) => {
  // Ignore bots, webhooks, and messages that do not start with the prefix.
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const input = message.content.slice(prefix.length).trim();
  if (!input) return;

  const [commandName] = input.split(/\s+/);
  const command = commands.get(commandName.toLowerCase());
  if (!command) return;

  try {
    await command(message);
  } catch (error) {
    console.error(`Command "${commandName}" failed:`, error);
    if (message.channel.isTextBased()) {
      await message.reply('Sorry, something went wrong while running that command.')
        .catch((replyError) => console.error('Could not send error reply:', replyError));
    }
  }
});

client.on(Events.Error, (error) => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

client.login(token).catch((error) => {
  console.error('Could not log in to Discord. Check DISCORD_TOKEN and bot settings.');
  console.error(error);
  process.exitCode = 1;
});
