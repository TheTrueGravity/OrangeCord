import { Client, Message, Role } from 'discord.js'
import ICommand from '../../interfaces/ICommand'
import { OrangeUtils } from '../../modules/utils'

const command: ICommand = {
    name: 'modRoles',
    category: 'admin',
    description: 'List all the moderator roles (needed for mod permissions)!',
    aliases: [],
    args: [],
    async exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) {
        const modRoleIDs =
            OrangeUtils.Servers[message.guildId as string].modRoles

        const modRoles = modRoleIDs
            .map((id) => {
                const role = message.guild?.roles.cache.get(id)
                if (role) return role
            })
            .filter((role) => {
                return role != undefined
            })

        let out = ''

        modRoles.forEach((role) => {
            out += `${role?.name} (${role?.id})\n`
        })

        // await message.reply(out)
        message.reply(out === '' ? 'No mod roles currently set!' : out)
    }
}

export default command
