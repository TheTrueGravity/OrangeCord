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
    name: 'nukeAllData',
    category: 'test',
    description: 'Test command to clear server data!',
    args: [],
    exec(client, message, args, args1) {
        return __awaiter(this, void 0, void 0, function* () {
            client.guilds.cache.forEach((guild) => {
                utils_1.OrangeUtils.RemoveServer(guild);
            });
            utils_1.OrangeUtils.writeFile();
            utils_1.OrangeUtils.checkNewServers(client);
            message.reply('All server data reset!');
        });
    }
};
exports.default = command;
