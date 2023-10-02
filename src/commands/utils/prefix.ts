import { Client, ColorResolvable, Message } from 'discord.js'
import ICommand, { AuthLevel } from '../../interfaces/ICommand'
import {
    reply,
    createThumbnailEmbed,
    createErrorEmbed
} from '../../modules/embeds'
import { OrangeUtils } from '../../modules/utils'

const command: ICommand = {
    name: 'prefix',
    category: 'utils',
    description: 'Gets or sets the prefix of the bot!',
    authLevel: AuthLevel.owner,
    aliases: [],
    args: ['?prefixes (seperated by commas)'],
    async exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) {
        if (args[0]) {
            const server = OrangeUtils.Servers[message.guildId as string]

            var prefixes = args[0].split(',')
            prefixes = prefixes.filter((prefix) => {
                return prefix != ''
            })
            server.prefix = prefixes.join(',')

            message.reply(`Server prefix is now set to "${server.prefix}"`)
            return
        }

        const server = OrangeUtils.Servers[message.guildId as string]
        const prefix = server.prefix
        message.reply(`The server prefix currently set to "${prefix}"`)
    }
}

export default command
