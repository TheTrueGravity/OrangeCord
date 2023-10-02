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
    name: 'leaderboard',
    category: 'oranges',
    description: 'Set the cooldown in minutes!',
    args: ['ammountToShow (max 25, default 10)'],
    aliases: ['lb'],
    authLevel: ICommand_1.AuthLevel.owner,
    exec(client, message, args, args1) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = utils_1.OrangeUtils.Servers[message.guildId];
            const slices = utils_1.OrangeUtils.Slices[message.guildId];
            let max = 10;
            if (args[0] && !Number.isNaN(args[0]))
                max = Math.min(Number(args[0]), 25);
            var arr = [];
            for (var _slice in slices) {
                arr.push(slices[_slice]);
            }
            arr = arr.sort((a, b) => b.slices - a.slices);
            let description = '';
            let index;
            for (index in arr) {
                index = Number(index);
                if (index >= max)
                    break;
                const slice = arr[index];
                description += `<@${slice.id}> (${slice.displayName}) #${index + 1} has ${slice.slices} slices!\n`;
            }
            yield (0, embeds_1.reply)(message, yield (0, embeds_1.createThumbnailEmbed)(description, process.env.MAIN_EMBED_COLOR, process.env.GOOD_ORANGE, message.author));
            return;
        });
    }
};
exports.default = command;
