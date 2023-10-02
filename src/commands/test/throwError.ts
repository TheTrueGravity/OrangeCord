import { Client, ColorResolvable, Message } from 'discord.js'
import ICommand, { AuthLevel } from '../../interfaces/ICommand'
import { reply, createThumbnailEmbed } from '../../modules/embeds'

const command: ICommand = {
    name: 'throwError',
    category: 'test',
    description: 'Test command to throw an error!',
    args: [],
    async exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) {
        throw new Error('Test error thrown by the throwError command!')
    }
}

export default command
