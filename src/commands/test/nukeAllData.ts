import { Client, ColorResolvable, Message } from 'discord.js'
import ICommand, { AuthLevel } from '../../interfaces/ICommand'
import { reply, createThumbnailEmbed } from '../../modules/embeds'
import { OrangeUtils } from '../../modules/utils'

const command: ICommand = {
    name: 'nukeAllData',
    category: 'test',
    description: 'Test command to clear server data!',
    args: [],
    async exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) {
        client.guilds.cache.forEach((guild) => {
            OrangeUtils.RemoveServer(guild)
        })
        OrangeUtils.writeFile()
        OrangeUtils.checkNewServers(client)
        message.reply('All server data reset!')
    }
}

export default command
