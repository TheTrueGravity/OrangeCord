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
    name: 'modRoles',
    category: 'admin',
    description: 'List all the moderator roles (needed for mod permissions)!',
    aliases: [],
    args: [],
    exec(client, message, args, args1) {
        return __awaiter(this, void 0, void 0, function* () {
            const modRoleIDs = utils_1.OrangeUtils.Servers[message.guildId].modRoles;
            const modRoles = modRoleIDs
                .map((id) => {
                var _a;
                const role = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.roles.cache.get(id);
                if (role)
                    return role;
            })
                .filter((role) => {
                return role != undefined;
            });
            let out = '';
            modRoles.forEach((role) => {
                out += `${role === null || role === void 0 ? void 0 : role.name} (${role === null || role === void 0 ? void 0 : role.id})\n`;
            });
            // await message.reply(out)
            message.reply(out === '' ? 'No mod roles currently set!' : out);
        });
    }
};
exports.default = command;
