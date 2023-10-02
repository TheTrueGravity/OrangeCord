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
const command = {
    name: 'invite',
    category: 'utils',
    description: 'Gives you the invite for the bot!',
    aliases: ['i'],
    args: [],
    exec(client, message, args, args1) {
        return __awaiter(this, void 0, void 0, function* () {
            // return message.reply(`Please invite me with ${process.env.INVITE_LINK}`)
            yield (0, embeds_1.reply)(message, yield (0, embeds_1.createThumbnailEmbed)(`Invite me to your server!\n[Invite](${process.env.INVITE_LINK})`, process.env.MAIN_EMBED_COLOUR, process.env.GOOD_ORANGE, message.author));
        });
    }
};
exports.default = command;
