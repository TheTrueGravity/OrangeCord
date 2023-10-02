import { Client, ColorResolvable, ImageURLOptions, Message } from 'discord.js'
import ICommand, { AuthLevel } from '../../interfaces/ICommand'
import { reply, createThumbnailEmbed } from '../../modules/embeds'
import { OrangeUtils } from '../../modules/utils'

async function getTime() {
    const timeNow = parseInt((new Date().getTime() / 1000).toFixed(0))
    return timeNow
}
async function formatRemaining(seconds: number): Promise<string> {
    if (seconds >= 60) {
        const minutes = Math.round(seconds / 60)
        return minutes.toString() + (minutes == 1 ? ' minute' : ' minutes')
    } else {
        return seconds.toString() + (seconds == 1 ? ' second' : ' seconds')
    }
}

const isCooldown: Record<string, boolean> = {}

const command: ICommand = {
    name: 'slice',
    category: 'oranges',
    description: 'Grab a slice if available!',
    aliases: ['s'],
    args: [],
    async exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) {
        const server = OrangeUtils.Servers[message.guildId as string]

        const timeNow = await getTime()
        const timeDif = timeNow - server.lastSlice

        console.log(
            server.cooldown * 60,
            timeDif,
            isCooldown[message.guildId as string]
        )

        if (
            server.cooldown * 60 <= timeDif &&
            !isCooldown[message.guildId as string]
        ) {
            isCooldown[message.guildId as string] = true
            setTimeout(() => {
                delete isCooldown[message.guildId as string]
            }, 2000)

            OrangeUtils.AddSlice(message.guildId as string, message.author)

            await reply(
                message,
                await createThumbnailEmbed(
                    `<@${
                        message.author.id
                    }>, Here, have a slice, you now have ${
                        OrangeUtils.Slices[message.guildId as string][
                            message.author.id
                        ].slices
                    } slices!`,
                    process.env.MAIN_EMBED_COLOR as ColorResolvable,
                    process.env.GOOD_ORANGE as string,
                    message.author
                )
            )
            server.lastSlice = timeNow
            return
        }

        await reply(
            message,
            await createThumbnailEmbed(
                `<@${message.author.id}>, please wait ${await formatRemaining(
                    Math.abs(server.cooldown * 60 - timeDif)
                )}!`,
                process.env.MAIN_EMBED_COLOR as ColorResolvable,
                process.env.BAD_ORANGE as string,
                message.author
            )
        )
    }
}

export default command
