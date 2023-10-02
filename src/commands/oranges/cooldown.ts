import { Client, ColorResolvable, Message } from 'discord.js'
import ICommand, { AuthLevel } from '../../interfaces/ICommand'
import {
    reply,
    createThumbnailEmbed,
    createErrorEmbed
} from '../../modules/embeds'
import { OrangeUtils } from '../../modules/utils'

const command: ICommand = {
    name: 'cooldown',
    category: 'oranges',
    description: 'Gets or sets the cooldown of the bot!',
    authLevel: AuthLevel.owner,
    aliases: [],
    args: ['?time (minutes)'],
    async exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) {
        if (args[0]) {
            const server = OrangeUtils.Servers[message.guildId as string]

            let cooldown: number

            cooldown = Number(args[0])

            if (Number.isNaN(cooldown)) {
                message.reply(`Invalid argument, ${args[0]} is not a number!`)
                return
            }

            server.cooldown = cooldown
            message.reply(`Server cooldown set to ${args[0]} minutes!`)
            return
        }

        const server = OrangeUtils.Servers[message.guildId as string]
        const cooldown = server.cooldown
        message.reply(`The server cooldown is set to ${cooldown} minutes!`)
    }
}

export default command
