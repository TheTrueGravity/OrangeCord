import { Client, Message, Role } from 'discord.js'
import ICommand from '../../interfaces/ICommand'
import { OrangeUtils } from '../../modules/utils'

const command: ICommand = {
    name: 'addModRole',
    category: 'admin',
    description: 'Add a moderator role (needed for mod permissions)!',
    aliases: ['amr'],
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
                message.reply(`Invalid role "${args1}"`)
                return
            }
            id = role.id
        }

        let role: Role | undefined
        message.guild?.roles.cache.forEach((_role) => {
            if (_role.id == id) role = _role
        })
        if (!role) {
            message.reply(`Invalid role "${args1}"`)
            return
        }

        if (
            OrangeUtils.Servers[message.guildId as string].modRoles.includes(id)
        ) {
            message.reply(
                `The role ${role.name} (${role.id}) is already a mod role!!`
            )
            return
        }

        OrangeUtils.Servers[message.guildId as string].modRoles.push(id)
        message.reply(
            `Successfully added the mod role ${role.name} (${role.id})!`
        )
    }
}

export default command
