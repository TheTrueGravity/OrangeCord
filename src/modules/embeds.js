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
exports.reply = exports.createFieldsEmbed = exports.createErrorEmbed = exports.createThumbnailEmbed = exports.createAuthorEmbed = exports.createTitleEmbed = exports.createBasicEmbed = void 0;
const discord_js_1 = require("discord.js");
// Return an embed with a given description and colour.
function createBasicEmbed(description, colour) {
    return __awaiter(this, void 0, void 0, function* () {
        const embed = new discord_js_1.EmbedBuilder()
            .setDescription(description)
            .setColor(colour);
        return embed;
    });
}
exports.createBasicEmbed = createBasicEmbed;
// Return an embed with a given title, description, colour and author.
function createTitleEmbed(title, description, colour, author, thumbnail) {
    return __awaiter(this, void 0, void 0, function* () {
        const _author = author instanceof discord_js_1.User
            ? { name: author.username, iconURL: author.avatarURL() }
            : author;
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(colour)
            .setAuthor(_author);
        if (thumbnail)
            embed.setThumbnail(thumbnail);
        return embed;
    });
}
exports.createTitleEmbed = createTitleEmbed;
// Return an embed with a given description, colour, and author.
function createAuthorEmbed(description, colour, author) {
    return __awaiter(this, void 0, void 0, function* () {
        const _author = author instanceof discord_js_1.User
            ? { name: author.username, iconURL: author.avatarURL() }
            : author;
        const embed = new discord_js_1.EmbedBuilder()
            .setDescription(description)
            .setColor(colour)
            .setAuthor(_author);
        return embed;
    });
}
exports.createAuthorEmbed = createAuthorEmbed;
// Return an embed with a given description, colour, and thumbnail.
function createThumbnailEmbed(description, colour, thumbnail, author) {
    return __awaiter(this, void 0, void 0, function* () {
        const _author = author instanceof discord_js_1.User
            ? { name: author.username, iconURL: author.avatarURL() }
            : author;
        const embed = new discord_js_1.EmbedBuilder()
            .setDescription(description)
            .setColor(colour)
            .setThumbnail(thumbnail)
            .setAuthor(_author);
        return embed;
    });
}
exports.createThumbnailEmbed = createThumbnailEmbed;
// Return an error embed with a given description and author
function createErrorEmbed(description, author, thumbnail) {
    return __awaiter(this, void 0, void 0, function* () {
        const _author = author instanceof discord_js_1.User
            ? { name: author.username, iconURL: author.avatarURL() }
            : author;
        const embed = new discord_js_1.EmbedBuilder()
            .setDescription(description)
            .setColor('#ff0000')
            .setAuthor(_author);
        if (thumbnail)
            embed.setThumbnail(thumbnail);
        return embed;
    });
}
exports.createErrorEmbed = createErrorEmbed;
// Return an embed with a given title, colour, author and fields.
function createFieldsEmbed(title, colour, author, fields) {
    return __awaiter(this, void 0, void 0, function* () {
        const _author = author instanceof discord_js_1.User
            ? { name: author.username, iconURL: author.avatarURL() }
            : author;
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(title)
            .setColor(colour)
            .setAuthor(_author)
            .addFields(fields);
        return embed;
    });
}
exports.createFieldsEmbed = createFieldsEmbed;
// Reply to a given message with an embed.
function reply(message, embed) {
    return __awaiter(this, void 0, void 0, function* () {
        return message.channel.send({
            embeds: [embed]
        });
    });
}
exports.reply = reply;
