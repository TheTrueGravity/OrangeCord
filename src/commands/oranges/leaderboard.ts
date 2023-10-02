import { Client, ColorResolvable, Message } from 'discord.js'
import ICommand, { AuthLevel } from '../../interfaces/ICommand'
import { OrangeUtils, IServerSlices } from '../../modules/utils'
import { createThumbnailEmbed, reply } from '../../modules/embeds'

const command: ICommand = {
    name: 'leaderboard',
    category: 'oranges',
    description: 'Set the cooldown in minutes!',
    args: ['ammountToShow (max 25, default 10)'],
    aliases: ['lb'],
    authLevel: AuthLevel.owner,
    async exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) {
        const server = OrangeUtils.Servers[message.guildId as string]
        const slices = OrangeUtils.Slices[message.guildId as string]
        let max = 10
        if (args[0] && !Number.isNaN(args[0]))
            max = Math.min(Number(args[0]), 25)

        console.log(max)

        var arr = []
        for (var _slice in slices) {
            arr.push(slices[_slice])
        }
        arr = arr.sort((a, b) => b.slices - a.slices)

        let description: string = ''

        let index: string | number

        for (index in arr) {
            index = Number(index)
            if (index >= max) break
            const slice = arr[index]
            description += `<@${slice.id}> (${slice.displayName}) #${
                index + 1
            } has ${slice.slices} slices!\n`
        }

        await reply(
            message,
            await createThumbnailEmbed(
                description,
                process.env.MAIN_EMBED_COLOR as ColorResolvable,
                process.env.GOOD_ORANGE as string,
                message.author
            )
        )

        return
    }
}

export default command
