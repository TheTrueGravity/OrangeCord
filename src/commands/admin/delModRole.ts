import { Client, Message, Role } from 'discord.js'
import ICommand from '../../interfaces/ICommand'
import { OrangeUtils } from '../../modules/utils'

const command: ICommand = {
    name: 'delModRole',
    category: 'admin',
    description: 'Remove a moderator role (needed for mod permissions)!',
    aliases: ['dmr'],
    args: ['roleID | role tag | role name'],
    async exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) {
        let id: string
        if (!args[0]) {
            message.reply('Please enter a role ID, name or tag!')
            return
        }
        if (args[0].startsWith('<@&') && args[0].endsWith('>')) {
            // Tag
            id = args[0].slice(3).slice(0, -1)
        } else if (!Number.isNaN(Number(args[0]))) {
            // ID
            id = args[0]
        } else {
            // Username
            let role: Role | undefined
            message.guild?.roles.cache.forEach((_role) => {
                if (_role.name == args1) role = _role
            })
            if (!role) {
                message.reply(`Invalid role "${args[0]}"`)
                return
            }
            id = role.id
        }

        let role: Role | undefined
        message.guild?.roles.cache.forEach((_role) => {
            if (_role.id == id) role = _role
        })
        if (!role) {
            message.reply(`Invalid role "${args[0]}"`)
            return
        }

        const modRoles = OrangeUtils.Servers[message.guildId as string].modRoles

        OrangeUtils.Servers[message.guildId as string].modRoles =
            modRoles.filter((value) => {
                return value != id
            })
        message.reply(
            `Successfully deleted the mod role ${role.name} (${role.id})!`
        )
    }
}

export default command
