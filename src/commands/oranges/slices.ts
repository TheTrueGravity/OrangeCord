import {
    Client,
    ColorResolvable,
    Guild,
    GuildMember,
    Message
} from 'discord.js'
import ICommand, { AuthLevel } from '../../interfaces/ICommand'
import { OrangeUtils } from '../../modules/utils'
import { createThumbnailEmbed, reply } from '../../modules/embeds'

const command: ICommand = {
    name: 'slices',
    category: 'oranges',
    description: 'Set the cooldown in minutes!',
    args: ['user? (ID, tag or username)'],
    authLevel: AuthLevel.owner,
    async exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) {
        const slices = OrangeUtils.Slices[message.guildId as string]
        let id: string

        if (!args[0]) {
            // No user specified
            id = message.author.id
        } else if (args[0].startsWith('<@') && args[0].endsWith('>')) {
            // Tag
            id = args[0].slice(2).slice(0, -1)
        } else if (!Number.isNaN(Number(args[0]))) {
            // ID
            id = args[0]
        } else {
            // Username
            let user: GuildMember | undefined
            message.guild?.members.cache.forEach((member) => {
                if (member.displayName == args[0]) user = member
            })
            if (!user) {
                message.reply(`Invalid username "${args[0]}"`)
                return
            }
            id = user.id
        }

        let _slices: number

        if (!slices[id]) {
            const users = message.guild?.members.cache.map(
                (member) => member.id
            )

            if (!users?.includes(id)) {
                message.reply(`Invalid user <@${id}>`)
                return
            }

            _slices = 0
        } else _slices = slices[id].slices

        await reply(
            message,
            await createThumbnailEmbed(
                `<@${id}> currently has ${_slices} slices!`,
                process.env.MAIN_EMBED_COLOR as ColorResolvable,
                process.env.GOOD_ORANGE as string,
                message.author
            )
        )
        return
    }
}

export default command
