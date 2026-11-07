# VirtualBot

A small, easy-to-run Discord bot that provides a welcome message and a few basic utility commands. This refreshed version uses **discord.js v14** and reads its bot token from an environment variable instead of a committed credentials file.

## Features

- `!ping` — confirms that the bot is responding and displays gateway latency.
- `!welcome` — sends a friendly welcome message.
- `!help` — lists the available commands.
- Configurable command prefix through `COMMAND_PREFIX` (defaults to `!`).
- Case-insensitive command names.
- Basic error handling and startup validation.
- No token or other credentials stored in source files.

## Requirements

- Node.js 20 or newer
- npm (included with Node.js)
- A Discord application and bot account

## Getting started

### 1. Create a Discord bot

1. Open the [Discord Developer Portal](https://discord.com/developers/applications).
2. Create an application, open its **Bot** page, and add a bot if one is not already present.
3. Under **Bot**, copy or reset the bot token. Treat it like a password: never publish it or commit it to Git.
4. In **Bot → Privileged Gateway Intents**, enable **Message Content Intent**. This project uses prefix commands, which require that intent.
5. Under **OAuth2 → URL Generator**, select the `bot` scope and grant the bot the permissions it needs, at minimum **View Channels**, **Send Messages**, and **Read Message History**. Open the generated URL to invite it to your server.

### 2. Install dependencies

Clone the repository, enter the project directory, and install packages:

```bash
git clone <your-repository-url>
cd VirtualBot
npm install
```

### 3. Configure the token

Set `DISCORD_TOKEN` in your environment. You can use `.env.example` as a reference, but do not rename it to a committed `.env` file or upload real credentials.

**macOS / Linux**
```bash
export DISCORD_TOKEN="paste-your-bot-token-here"
```

**Windows PowerShell**
```powershell
$env:DISCORD_TOKEN = "paste-your-bot-token-here"
```

Optionally set a custom prefix:

```bash
export COMMAND_PREFIX="?"
```

On hosting platforms, add `DISCORD_TOKEN` (and optionally `COMMAND_PREFIX`) in the platform's environment-variable or secrets settings.

### 4. Start the bot

```bash
npm start
```

A successful connection prints the bot account name in the terminal. To check JavaScript syntax without starting the bot:

```bash
npm run check
```

## Commands

| Command | Description |
| --- | --- |
| `!ping` | Replies with Pong and the gateway latency. |
| `!welcome` | Sends a welcome message. |
| `!help` | Lists available commands. |

Replace `!` with your configured prefix when using a custom one.

## Deploying

The included `Procfile` defines a worker process:

```text
worker: npm start
```

Configure `DISCORD_TOKEN` in your host's secret/environment settings before deploying. Do not put the token in the Procfile, source code, screenshots, or public issue reports.

## Project structure

```text
VirtualBot/
├── .env.example
├── .gitignore
├── LICENSE
├── Procfile
├── README.md
├── bot.js
└── package.json
```

## Security notes

- Never commit `.env`, `auth.json`, bot tokens, or other credentials.
- If a token was ever committed or shared, reset it in the Discord Developer Portal immediately. Removing a secret from the latest commit does not invalidate it or erase it from Git history.
- Keep the Message Content privileged intent enabled in the Developer Portal for prefix commands to work.

## License

See [LICENSE](LICENSE) for the terms governing this project. The license file is included unchanged.
