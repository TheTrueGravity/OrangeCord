import { Client, ColorResolvable, Message } from 'discord.js'
import ICommand from '../../interfaces/ICommand'
import { reply, createThumbnailEmbed } from '../../modules/embeds'

const command: ICommand = {
    name: 'invite',
    category: 'utils',
    description: 'Gives you the invite for the bot!',
    aliases: ['i'],
    args: [],
    async exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) {
        // return message.reply(`Please invite me with ${process.env.INVITE_LINK}`)
        await reply(
            message,
            await createThumbnailEmbed(
                `Invite me to your server!\n[Invite](${process.env.INVITE_LINK})`,
                process.env.MAIN_EMBED_COLOUR as ColorResolvable,
                process.env.GOOD_ORANGE as string,
                message.author
            )
        )
    }
}

export default command
