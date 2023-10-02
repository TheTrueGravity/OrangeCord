import { Client, ColorResolvable, GuildMember, Message } from 'discord.js'
import ICommand, { AuthLevel } from '../../interfaces/ICommand'
import { OrangeUtils } from '../../modules/utils'
import { createErrorEmbed, createTitleEmbed, reply } from '../../modules/embeds'
import ICategory from '../../interfaces/ICategory'

const command: ICommand = {
    name: 'help',
    category: 'utils',
    description: 'Help command of the bot!',
    args: ['', '{Category name}', '{Command name}'],
    aliases: ['h'],
    exec: async (
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) => {
        const categories = Array.from(OrangeUtils.Categories.values())

        // Main page
        if (!args[0]) {
            var description = ''

            for (var _category of categories) {
                if (
                    OrangeUtils.checkAuthLevel(
                        message.member as GuildMember,
                        _category.authLevel
                            ? _category.authLevel
                            : AuthLevel.member
                    )
                )
                    description += `${_category.name} - ${_category.description} (Requires ${_category.authLevel})\n\n`
            }

            await reply(
                message,
                await createTitleEmbed(
                    'Help',
                    description,
                    process.env.MAIN_EMBED_COLOR as ColorResolvable,
                    message.author,
                    process.env.GOOD_ORANGE as string
                )
            )

            return
        }

        // Command list view
        const categoryName = categories
            .map((x) => x.name)
            .find((e) => e == args[0].toLowerCase())
        if (categoryName) {
            // Grab the category
            const category = OrangeUtils.Categories.get(
                categoryName
            ) as ICategory

            // Check auth levels
            if (
                !OrangeUtils.checkAuthLevel(
                    message.member as GuildMember,
                    category.authLevel ? category.authLevel : AuthLevel.member
                )
            ) {
                await reply(
                    message,
                    await createErrorEmbed(
                        'You do not have the required permissions!',
                        message.author,
                        process.env.BAD_ORANGE
                    )
                )
                return
            }

            // Get list of commands
            var description = ''
            const commands = OrangeUtils.CategoriesCommands.get(
                categoryName
            ) as string[]

            // Itterate through list of commands and grab each command
            for (var cmd of commands) {
                const command = OrangeUtils.Commands.get(cmd) as ICommand
                description += `**Name:** ${command.name}\n**Description**: ${command.description}\n**Category**: ${command.category}`
                if ((command.aliases?.length as number) > 0) {
                    description += `\n**Aliases** - ${(
                        command.aliases as string[]
                    )
                        .join(', ')
                        .slice(
                            0,
                            (command.aliases as string[]).join(', ').length
                        )}`
                }
                if ((command.args?.length as number) > 0) {
                    description += `\n**Arguments** - ${
                        typeof command.args == 'string'
                            ? command.args
                            : command.args.join(' ')
                    }`
                }
                description += '\n\n'
            }

            await reply(
                message,
                await createTitleEmbed(
                    `Help - ${category.name} (Requires ${category.authLevel})`,
                    description,
                    process.env.MAIN_EMBED_COLOR as ColorResolvable,
                    message.author,
                    process.env.BAD_ORANGE
                )
            )
            return
        }

        // Command view
        const command = OrangeUtils.Commands.get(
            OrangeUtils.Aliases.get(args[0].toLowerCase()) as string
        ) as ICommand
        const category = OrangeUtils.Categories.get(
            command.category
        ) as ICategory

        // Check auth levels
        if (
            !OrangeUtils.checkAuthLevel(
                message.member as GuildMember,
                command.authLevel
                    ? command.authLevel
                    : category.authLevel
                    ? category.authLevel
                    : AuthLevel.member
            )
        ) {
            await reply(
                message,
                await createErrorEmbed(
                    'You do not have the required permissions!',
                    message.author,
                    process.env.BAD_ORANGE
                )
            )
            return
        }

        var description = `**Name:** ${
            (await command).name
        }\n**Description**: ${command.description}\n**Category**: ${
            command.category
        }`
        if ((command.aliases?.length as number) > 0) {
            description += `\n**Aliases** - ${command.aliases}`
        }
        if ((command.args?.length as number) > 0) {
            description += `\n**Arguments** - ${
                typeof command.args == 'string'
                    ? command.args
                    : command.args.join(' ')
            }`
        }
        description += '\n\n'

        await reply(
            message,
            await createTitleEmbed(
                `Help - ${command.name} (Requires ${
                    command.authLevel
                        ? command.authLevel
                        : category.authLevel
                        ? category.authLevel
                        : AuthLevel.member
                })`,
                description,
                process.env.MAIN_EMBED_COLOR as ColorResolvable,
                message.author,
                process.env.BAD_ORANGE
            )
        )
    }
}

export default command
