import { Client, ColorResolvable, Message } from 'discord.js'
import ICommand from '../../interfaces/ICommand'
import { reply, createThumbnailEmbed } from '../../modules/embeds'

const command: ICommand = {
    name: 'github',
    category: 'utils',
    description: 'Gives the github repo link, please submit issues here!',
    aliases: ['git'],
    args: [],
    async exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) {
        await reply(
            message,
            await createThumbnailEmbed(
                `Check out the public [GitHub](${process.env.GITHUB_LINK})!`,
                process.env.MAIN_EMBED_COLOR as ColorResolvable,
                process.env.GOOD_ORANGE as string,
                message.author
            )
        )
    }
}

export default command
