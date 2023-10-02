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
const embeds_1 = require("../../modules/embeds");
const utils_1 = require("../../modules/utils");
function getTime() {
    return __awaiter(this, void 0, void 0, function* () {
        const timeNow = parseInt((new Date().getTime() / 1000).toFixed(0));
        return timeNow;
    });
}
function formatRemaining(seconds) {
    return __awaiter(this, void 0, void 0, function* () {
        if (seconds >= 60) {
            const minutes = Math.round(seconds / 60);
            return minutes.toString() + (minutes == 1 ? ' minute' : ' minutes');
        }
        else {
            return seconds.toString() + (seconds == 1 ? ' second' : ' seconds');
        }
    });
}
const isCooldown = {};
const command = {
    name: 'slice',
    category: 'oranges',
    description: 'Grab a slice if available!',
    aliases: ['s'],
    args: [],
    exec(client, message, args, args1) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = utils_1.OrangeUtils.Servers[message.guildId];
            const timeNow = yield getTime();
            const timeDif = timeNow - server.lastSlice;
            if (server.cooldown * 60 <= timeDif &&
                !isCooldown[message.guildId]) {
                server.lastSlice = timeNow;
                isCooldown[message.guildId] = true;
                setTimeout(() => {
                    delete isCooldown[message.guildId];
                }, 2000);
                utils_1.OrangeUtils.AddSlice(message.guildId, message.author);
                yield (0, embeds_1.reply)(message, yield (0, embeds_1.createThumbnailEmbed)(`<@${message.author.id}>, Here, have a slice, you now have ${utils_1.OrangeUtils.Slices[message.guildId][message.author.id].slices} slices!`, process.env.MAIN_EMBED_COLOR, process.env.GOOD_ORANGE, message.author));
                return;
            }
            yield (0, embeds_1.reply)(message, yield (0, embeds_1.createErrorEmbed)(`<@${message.author.id}>, please wait ${yield formatRemaining(Math.abs(server.cooldown * 60 - timeDif))}!`, message.author, process.env.BAD_ORANGE));
        });
    }
};
exports.default = command;
