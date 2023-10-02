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
const ITask_1 = require("../interfaces/ITask");
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const betterjslogger_1 = require("betterjslogger");
const utils_1 = require("../modules/utils");
const Task = {
    name: 'ready',
    enabled: true,
    taskType: ITask_1.TaskTypes.onClientEvent,
    description: 'Log info on the bot client when ready',
    run: (client, logger) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        logger.log(betterjslogger_1.LogLevel.INFO, '-------------------------------------------');
        logger.log(betterjslogger_1.LogLevel.INFO, `Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
        logger.log(betterjslogger_1.LogLevel.INFO, `Client id: ${(_b = client.user) === null || _b === void 0 ? void 0 : _b.id}`);
        logger.log(betterjslogger_1.LogLevel.INFO, `Deployment: ${yield process.env.DEPLOYMENT}`);
        logger.log(betterjslogger_1.LogLevel.INFO, `Version: ${JSON.parse((0, fs_1.readFileSync)('./package.json').toString())['version']}`);
        logger.log(betterjslogger_1.LogLevel.INFO, '-------------------------------------------');
        (_c = client.user) === null || _c === void 0 ? void 0 : _c.setActivity(`🍊${utils_1.OrangeUtils.DefaultPrefix.split(',')[0]}help`, {
            type: discord_js_1.ActivityType.Custom
        });
        utils_1.OrangeUtils.checkNewServers(client);
    })
};
exports.default = Task;
