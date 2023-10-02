import { Client, ColorResolvable, Message } from 'discord.js'
import ICommand, { AuthLevel } from '../../interfaces/ICommand'
import { reply, createThumbnailEmbed } from '../../modules/embeds'

const command: ICommand = {
    name: 'ping',
    category: 'utils',
    description: 'Returns latency and API latency!',
    aliases: ['p'],
    args: [],
    async exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) {
        const msg = await message.channel.send(`🏓 Pinging...`)
        const description = `🏓 Latency: ${
            msg.createdTimestamp - message.createdTimestamp
        }ms\n🏓 API Latency: ${Math.round(client.ws.ping)}ms`
        await msg.delete()
        await reply(
            message,
            await createThumbnailEmbed(
                description,
                process.env.MAIN_EMBED_COLOR as ColorResolvable,
                process.env.GOOD_ORANGE as string,
                message.author
            )
        )
    }
}

export default command
