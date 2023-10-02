"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ICommand_1 = require("../../interfaces/ICommand");
const utils_1 = require("../../modules/utils");
const embeds_1 = require("../../modules/embeds");
const command = {
    name: 'help',
    category: 'utils',
    description: 'Help command of the bot!',
    args: ['', '{Category name}', '{Command name}'],
    aliases: ['h'],
    exec: (client, message, args, args1) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const categories = Array.from(utils_1.OrangeUtils.Categories.values());
        // Main page
        if (!args[0]) {
            var description = '';
            for (var _category of categories) {
                if (utils_1.OrangeUtils.checkAuthLevel(message.member, _category.authLevel
                    ? _category.authLevel
                    : ICommand_1.AuthLevel.member))
                    description += `${_category.name} - ${_category.description} (Requires ${_category.authLevel})\n\n`;
            }
            yield (0, embeds_1.reply)(message, yield (0, embeds_1.createTitleEmbed)('Help', description, process.env.MAIN_EMBED_COLOR, message.author, process.env.GOOD_ORANGE));
            return;
        }
        // Command list view
        const categoryName = categories
            .map((x) => x.name)
            .find((e) => e == args[0].toLowerCase());
        if (categoryName) {
            // Grab the category
            const category = utils_1.OrangeUtils.Categories.get(categoryName);
            // Check auth levels
            if (!utils_1.OrangeUtils.checkAuthLevel(message.member, category.authLevel ? category.authLevel : ICommand_1.AuthLevel.member)) {
                yield (0, embeds_1.reply)(message, yield (0, embeds_1.createErrorEmbed)('You do not have the required permissions!', message.author, process.env.BAD_ORANGE));
                return;
            }
            // Get list of commands
            var description = '';
            const commands = utils_1.OrangeUtils.CategoriesCommands.get(categoryName);
            // Itterate through list of commands and grab each command
            for (var cmd of commands) {
                const command = utils_1.OrangeUtils.Commands.get(cmd);
                description += `**Name:** ${command.name}\n**Description**: ${command.description}\n**Category**: ${command.category}`;
                if (((_a = command.aliases) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    description += `\n**Aliases** - ${command.aliases
                        .join(', ')
                        .slice(0, command.aliases.join(', ').length)}`;
                }
                if (((_b = command.args) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                    description += `\n**Arguments** - ${typeof command.args == 'string'
                        ? command.args
                        : command.args.join(' ')}`;
                }
                description += '\n\n';
            }
            yield (0, embeds_1.reply)(message, yield (0, embeds_1.createTitleEmbed)(`Help - ${category.name} (Requires ${category.authLevel})`, description, process.env.MAIN_EMBED_COLOR, message.author, process.env.BAD_ORANGE));
            return;
        }
        // Command view
        const command = utils_1.OrangeUtils.Commands.get(utils_1.OrangeUtils.Aliases.get(args[0].toLowerCase()));
        const category = utils_1.OrangeUtils.Categories.get(command.category);
        // Check auth levels
        if (!utils_1.OrangeUtils.checkAuthLevel(message.member, command.authLevel
            ? command.authLevel
            : category.authLevel
                ? category.authLevel
                : ICommand_1.AuthLevel.member)) {
            yield (0, embeds_1.reply)(message, yield (0, embeds_1.createErrorEmbed)('You do not have the required permissions!', message.author, process.env.BAD_ORANGE));
            return;
        }
        var description = `**Name:** ${(yield command).name}\n**Description**: ${command.description}\n**Category**: ${command.category}`;
        if (((_c = command.aliases) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            description += `\n**Aliases** - ${command.aliases}`;
        }
        if (((_d = command.args) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            description += `\n**Arguments** - ${typeof command.args == 'string'
                ? command.args
                : command.args.join(' ')}`;
        }
        description += '\n\n';
        yield (0, embeds_1.reply)(message, yield (0, embeds_1.createTitleEmbed)(`Help - ${command.name} (Requires ${command.authLevel
            ? command.authLevel
            : category.authLevel
                ? category.authLevel
                : ICommand_1.AuthLevel.member})`, description, process.env.MAIN_EMBED_COLOR, message.author, process.env.BAD_ORANGE));
    })
};
exports.default = command;
