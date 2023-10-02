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
    name: 'slices',
    category: 'oranges',
    description: 'Set the cooldown in minutes!',
    args: ['user? (ID, tag or username)'],
    authLevel: ICommand_1.AuthLevel.owner,
    exec(client, message, args, args1) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const slices = utils_1.OrangeUtils.Slices[message.guildId];
            let id;
            if (!args[0]) {
                // No user specified
                id = message.author.id;
            }
            else if (args[0].startsWith('<@') && args[0].endsWith('>')) {
                // Tag
                id = args[0].slice(2).slice(0, -1);
            }
            else if (!Number.isNaN(Number(args[0]))) {
                // ID
                id = args[0];
            }
            else {
                // Username
                let user;
                (_a = message.guild) === null || _a === void 0 ? void 0 : _a.members.cache.forEach((member) => {
                    if (member.displayName == args[0])
                        user = member;
                });
                if (!user) {
                    message.reply(`Invalid username "${args[0]}"`);
                    return;
                }
                id = user.id;
            }
            let _slices;
            if (!slices[id]) {
                const users = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.cache.map((member) => member.id);
                if (!(users === null || users === void 0 ? void 0 : users.includes(id))) {
                    message.reply(`Invalid user <@${id}>`);
                    return;
                }
                _slices = 0;
            }
            else
                _slices = slices[id].slices;
            yield (0, embeds_1.reply)(message, yield (0, embeds_1.createThumbnailEmbed)(`<@${id}> currently has ${_slices} slices!`, process.env.MAIN_EMBED_COLOR, process.env.GOOD_ORANGE, message.author));
            return;
        });
    }
};
exports.default = command;
