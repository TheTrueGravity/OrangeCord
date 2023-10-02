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
const utils_1 = require("../../modules/utils");
const command = {
    name: 'delModRole',
    category: 'admin',
    description: 'Remove a moderator role (needed for mod permissions)!',
    aliases: ['dmr'],
    args: ['roleID | role tag | role name'],
    exec(client, message, args, args1) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            if (!args[0]) {
                message.reply('Please enter a role ID, name or tag!');
                return;
            }
            if (args[0].startsWith('<@&') && args[0].endsWith('>')) {
                // Tag
                id = args[0].slice(3).slice(0, -1);
            }
            else if (!Number.isNaN(Number(args[0]))) {
                // ID
                id = args[0];
            }
            else {
                // Username
                let role;
                (_a = message.guild) === null || _a === void 0 ? void 0 : _a.roles.cache.forEach((_role) => {
                    if (_role.name == args1)
                        role = _role;
                });
                if (!role) {
                    message.reply(`Invalid role "${args[0]}"`);
                    return;
                }
                id = role.id;
            }
            let role;
            (_b = message.guild) === null || _b === void 0 ? void 0 : _b.roles.cache.forEach((_role) => {
                if (_role.id == id)
                    role = _role;
            });
            if (!role) {
                message.reply(`Invalid role "${args[0]}"`);
                return;
            }
            const modRoles = utils_1.OrangeUtils.Servers[message.guildId].modRoles;
            utils_1.OrangeUtils.Servers[message.guildId].modRoles =
                modRoles.filter((value) => {
                    return value != id;
                });
            message.reply(`Successfully deleted the mod role ${role.name} (${role.id})!`);
        });
    }
};
exports.default = command;
