const { OrangeUtils } = require('./modules/utils')
const { Client, GatewayIntentBits, Partials } = require('discord.js')
const { default: Logger, LogLevel } = require('betterjslogger')

require('dotenv').config()
const logger = new Logger({
    logFolder: './logs',
    logToFile: true
})

OrangeUtils.logger = logger

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions
    ],
    partials: [Partials.Channel]
})
client.on('error', (err) => {
    return logger.log(LogLevel.ERROR, err)
})
client.on('guildCreate', OrangeUtils.AddServer)
client.on('guildDelete', OrangeUtils.RemoveServer)

async function start() {
    new OrangeUtils('./config.yaml')

    await require('./modules/tasks').load(client, logger, process.env.taskDir)
    await require('./modules/commands').load(
        client,
        logger,
        process.env.commandDir
    )

    logger.log(LogLevel.INFO, 'Client logging in...')
    await client.login(process.env.TOKEN)
}

start()
