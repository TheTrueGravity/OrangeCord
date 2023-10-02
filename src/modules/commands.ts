import { readdirSync, PathLike } from 'fs'
import {
    Collection,
    Client,
    SlashCommandBuilder,
    REST,
    Routes
} from 'discord.js'
import { AsciiTable3 } from 'ascii-table3'
import Logger, { LogLevel } from 'betterjslogger'
import ICommand from '../interfaces/ICommand'
import ICategory from '../interfaces/ICategory'
import { OrangeUtils } from './utils'

export function load(
    client: Client,
    logger: Logger,
    commandDir: PathLike
): void {
    const commands: Collection<string, ICommand> = new Collection()
    const aliases: Collection<string, string> = new Collection()
    const categories: Collection<string, ICategory> = new Collection()
    const categoriesCommands: Collection<string, string[]> = new Collection()

    const table = new AsciiTable3('Commands').setHeading(
        'Command',
        'Load status'
    )

    readdirSync(commandDir).forEach((dir) => {
        const _commands = readdirSync(`${commandDir}/${dir}/`).filter((f) =>
            f.endsWith('.js')
        )

        var categoryName = ''
        var commandList: string[] = []

        for (let file of _commands) {
            let pull = require(`${commandDir}/${dir}/${file.split('.')[0]}`)

            if (file == '_category.js') {
                categories.set(pull.name.toLowerCase(), pull)
                categoryName = pull.name.toLowerCase()
                continue
            }

            if (pull.default) pull = pull.default
            const command: ICommand = pull

            if (pull.name) {
                commands.set(command.name.toLowerCase(), command)
                aliases.set(
                    command.name.toLowerCase(),
                    command.name.toLowerCase()
                )
                commandList.push(command.name.toLowerCase())
                table.addRow(file, '✅')
            } else {
                table.addRow(file, '❌ -> missing something?')
                continue
            }

            if (command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach((alias) =>
                    aliases.set(alias.toLowerCase(), command.name.toLowerCase())
                )
            }
        }

        categoriesCommands.set(categoryName, commandList)
    })

    logger.log(LogLevel.VERBOSE, table.toString())

    OrangeUtils.Commands = commands
    OrangeUtils.Aliases = aliases
    OrangeUtils.Categories = categories
    OrangeUtils.CategoriesCommands = categoriesCommands
}
