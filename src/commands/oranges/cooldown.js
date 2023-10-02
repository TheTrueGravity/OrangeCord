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
const command = {
    name: 'cooldown',
    category: 'oranges',
    description: 'Gets or sets the cooldown of the bot!',
    authLevel: ICommand_1.AuthLevel.owner,
    aliases: [],
    args: ['?time (minutes)'],
    exec(client, message, args, args1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args[0]) {
                const server = utils_1.OrangeUtils.Servers[message.guildId];
                let cooldown;
                cooldown = Number(args[0]);
                if (Number.isNaN(cooldown)) {
                    message.reply(`Invalid argument, ${args[0]} is not a number!`);
                    return;
                }
                server.cooldown = cooldown;
                message.reply(`Server cooldown set to ${args[0]} minutes!`);
                return;
            }
            const server = utils_1.OrangeUtils.Servers[message.guildId];
            const cooldown = server.cooldown;
            message.reply(`The server cooldown is set to ${cooldown} minutes!`);
        });
    }
};
exports.default = command;
