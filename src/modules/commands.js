"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
const fs_1 = require("fs");
const discord_js_1 = require("discord.js");
const ascii_table3_1 = require("ascii-table3");
const betterjslogger_1 = require("betterjslogger");
const utils_1 = require("./utils");
function load(client, logger, commandDir) {
    const commands = new discord_js_1.Collection();
    const aliases = new discord_js_1.Collection();
    const categories = new discord_js_1.Collection();
    const categoriesCommands = new discord_js_1.Collection();
    const table = new ascii_table3_1.AsciiTable3('Commands').setHeading('Command', 'Load status');
    (0, fs_1.readdirSync)(commandDir).forEach((dir) => {
        const _commands = (0, fs_1.readdirSync)(`${commandDir}/${dir}/`).filter((f) => f.endsWith('.js'));
        var categoryName = '';
        var commandList = [];
        for (let file of _commands) {
            let pull = require(`${commandDir}/${dir}/${file.split('.')[0]}`);
            if (file == '_category.js') {
                categories.set(pull.name.toLowerCase(), pull);
                categoryName = pull.name.toLowerCase();
                continue;
            }
            if (pull.default)
                pull = pull.default;
            const command = pull;
            if (pull.name) {
                commands.set(command.name.toLowerCase(), command);
                aliases.set(command.name.toLowerCase(), command.name.toLowerCase());
                commandList.push(command.name.toLowerCase());
                table.addRow(file, '✅');
            }
            else {
                table.addRow(file, '❌ -> missing something?');
                continue;
            }
            if (command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach((alias) => aliases.set(alias.toLowerCase(), command.name.toLowerCase()));
            }
        }
        categoriesCommands.set(categoryName, commandList);
    });
    logger.log(betterjslogger_1.LogLevel.VERBOSE, table.toString());
    utils_1.OrangeUtils.Commands = commands;
    utils_1.OrangeUtils.Aliases = aliases;
    utils_1.OrangeUtils.Categories = categories;
    utils_1.OrangeUtils.CategoriesCommands = categoriesCommands;
}
exports.load = load;
