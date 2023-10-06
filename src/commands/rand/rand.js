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
const betterjslogger_1 = require("betterjslogger");
const command = {
    name: 'rand',
    category: 'rand',
    description: 'DM a random person mentioned!',
    args: ['count', '...users'],
    exec(client, message, args, args1) {
        return __awaiter(this, void 0, void 0, function* () {
            const mentions = message.mentions.users.map((user) => user);
            const count = Number(args[0]);
            const shareChosen = args[1] == '1' ? true : false;
            if (mentions.length < count + 1) {
                message.reply(`Please mention at least ${count + 1} users!`);
                return;
            }
            const users = [];
            const used = [-1];
            for (var i = 0; i < count; i++) {
                var index = -1;
                while (used.includes(index)) {
                    index = Math.floor(Math.random() * mentions.length);
                }
                const randUser = mentions[index];
                users.push(randUser);
                used.push(index);
            }
            for (const user of users) {
                const dm = yield user.createDM();
                if (shareChosen) {
                    const userList = users.map((user) => user.displayName);
                    userList.filter((_user) => (_user = user.displayName));
                    let last;
                    if (userList.length > 1) {
                        last = userList.pop();
                    }
                    yield dm.send(`You have been chosen along with ${last
                        ? userList[0]
                        : `${userList.join(', ')} and ${last}`}.`);
                }
                else {
                    yield dm.send('You have been chosen!');
                }
                utils_1.OrangeUtils.logger.log(betterjslogger_1.LogLevel.INFO, `${user.displayName} (${user.id}) has been chosen!`);
            }
            message.reply(`${count} user(s) has been chosen!`);
        });
    }
};
exports.default = command;
