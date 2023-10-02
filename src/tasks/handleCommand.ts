import ITask, { TaskTypes } from '../interfaces/ITask'
import { Client, ActivityType, Message, GuildMember } from 'discord.js'
import { readFileSync } from 'fs'
import Logger, { LogLevel } from 'betterjslogger'
import { OrangeUtils } from '../modules/utils'
import { reply, createErrorEmbed } from '../modules/embeds'
import { AuthLevel } from '../interfaces/ICommand'
import ICategory from '../interfaces/ICategory'

const Task: ITask = {
    name: 'messageCreate',
    enabled: true,
    taskType: TaskTypes.onClientEvent,
    description: 'Handles incoming messages and runs commands',
    run: async (client: Client, logger: Logger, message: Message) => {
        if (message.author.bot) return
        if (!message.guild) return

        var serverData = OrangeUtils.Servers[message.guild?.id.toString()]

        var hasPrefix = false
        var prefix = ''

        for (const _prefix of (
            serverData.prefix +
            ',' +
            OrangeUtils.DefaultPrefix
        ).split(',')) {
            if (message.content.toLowerCase().startsWith(_prefix)) {
                hasPrefix = true
                prefix = _prefix
                break
            }
        }

        if (!hasPrefix) return

        if (serverData.channel && message.channelId != serverData.channel)
            return

        const args = message.content
            .slice(prefix.length)
            .trim()
            .replace(prefix, '')
            .split(/ +/g)
        const args1 = message.content
            .slice(prefix.length)
            .trimStart()
            .replace(prefix, '')
            .replace(args[0], '')
            .trimStart()

        const cmd = args.shift()?.toLowerCase()

        if (!cmd) return message.reply('Invalid command!')

        const command = OrangeUtils.Commands.get(
            OrangeUtils.Aliases.get(cmd) as string
        )

        if (!command) {
            logger.log(
                LogLevel.VERBOSE,
                `${message.author.tag} (${message.author.id}) tried to run the command: "${cmd}"`
            )
            return message.reply('Invalid command!')
        }
        const category = OrangeUtils.Categories.get(
            command.category
        ) as ICategory

        if (
            !OrangeUtils.checkAuthLevel(
                message.member as GuildMember,
                command.authLevel
                    ? command.authLevel
                    : category.authLevel
                    ? category.authLevel
                    : AuthLevel.member
            )
        ) {
            return reply(
                message,
                await createErrorEmbed(
                    'You do not have the required permissions for that command!',
                    message.author,
                    process.env.BAD_ORANGE
                )
            )
        }
        switch (command.development) {
            case true:
                if (OrangeUtils.development) return
                break
            case false:
                if (!OrangeUtils.development) return
                break
        }

        try {
            const run = await command.exec(client, message, args, args1)
            if (run instanceof Error) throw run
        } catch (err: any) {
            logger.log(LogLevel.ERROR, err)
            return await reply(
                message,
                await createErrorEmbed(
                    `There was an error running the command: ${command.name}`,
                    message.author,
                    process.env.BAD_ORANGE
                )
            )
        }
        logger.log(
            LogLevel.VERBOSE,
            `${message.author.tag} (${message.author.id}) successfully ran the command: "${command.name}"`
        )
    }
}

export default Task
