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
const ITask_1 = require("../interfaces/ITask");
const betterjslogger_1 = require("betterjslogger");
const utils_1 = require("../modules/utils");
const embeds_1 = require("../modules/embeds");
const ICommand_1 = require("../interfaces/ICommand");
const Task = {
    name: 'messageCreate',
    enabled: true,
    taskType: ITask_1.TaskTypes.onClientEvent,
    description: 'Handles incoming messages and runs commands',
    run: (client, logger, message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (message.author.bot)
            return;
        if (!message.guild)
            return;
        var serverData = utils_1.OrangeUtils.Servers[(_a = message.guild) === null || _a === void 0 ? void 0 : _a.id.toString()];
        var hasPrefix = false;
        var prefix = '';
        for (const _prefix of (serverData.prefix +
            ',' +
            utils_1.OrangeUtils.DefaultPrefix).split(',')) {
            if (message.content.toLowerCase().startsWith(_prefix)) {
                hasPrefix = true;
                prefix = _prefix;
                break;
            }
        }
        if (!hasPrefix)
            return;
        if (serverData.channel && message.channelId != serverData.channel)
            return;
        const args = message.content
            .slice(prefix.length)
            .trim()
            .replace(prefix, '')
            .split(/ +/g);
        const args1 = message.content
            .slice(prefix.length)
            .trimStart()
            .replace(prefix, '')
            .replace(args[0], '')
            .trimStart();
        const cmd = (_b = args.shift()) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        if (!cmd)
            return message.reply('Invalid command!');
        const command = utils_1.OrangeUtils.Commands.get(utils_1.OrangeUtils.Aliases.get(cmd));
        if (!command) {
            logger.log(betterjslogger_1.LogLevel.VERBOSE, `${message.author.tag} (${message.author.id}) tried to run the command: "${cmd}"`);
            return message.reply('Invalid command!');
        }
        const category = utils_1.OrangeUtils.Categories.get(command.category);
        if (!utils_1.OrangeUtils.checkAuthLevel(message.member, command.authLevel
            ? command.authLevel
            : category.authLevel
                ? category.authLevel
                : ICommand_1.AuthLevel.member)) {
            return (0, embeds_1.reply)(message, yield (0, embeds_1.createErrorEmbed)('You do not have the required permissions for that command!', message.author, process.env.BAD_ORANGE));
        }
        switch (command.development) {
            case true:
                if (utils_1.OrangeUtils.development)
                    return;
                break;
            case false:
                if (!utils_1.OrangeUtils.development)
                    return;
                break;
        }
        try {
            const run = yield command.exec(client, message, args, args1);
            if (run instanceof Error)
                throw run;
        }
        catch (err) {
            logger.log(betterjslogger_1.LogLevel.ERROR, err);
            return yield (0, embeds_1.reply)(message, yield (0, embeds_1.createErrorEmbed)(`There was an error running the command: ${command.name}`, message.author, process.env.BAD_ORANGE));
        }
        logger.log(betterjslogger_1.LogLevel.VERBOSE, `${message.author.tag} (${message.author.id}) successfully ran the command: "${command.name}"`);
    })
};
exports.default = Task;
