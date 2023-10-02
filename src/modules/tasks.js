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
exports.load = void 0;
const fs_1 = require("fs");
const discord_js_1 = require("discord.js");
const ITask_1 = require("../interfaces/ITask");
const ascii_table3_1 = require("ascii-table3");
const betterjslogger_1 = require("betterjslogger");
function load(client, logger, taskDir) {
    const tasks = new discord_js_1.Collection();
    const table = new ascii_table3_1.AsciiTable3('Tasks').setHeading('Task', 'Load status');
    const dir = (0, fs_1.readdirSync)(taskDir);
    const _tasks = dir.filter((f) => f.endsWith('.js'));
    for (var file of _tasks) {
        let req = require(`${taskDir}/${file.split('.')[0]}`);
        const task = req.default;
        if (task.name) {
            tasks.set(task.name, task);
            table.addRow(file, '✅');
        }
        else {
            table.addRow(file, '❌ -> missing something?');
            continue;
        }
    }
    logger.log(betterjslogger_1.LogLevel.VERBOSE, table.toString());
    tasks.forEach((task) => __awaiter(this, void 0, void 0, function* () {
        if (task.development && process.env.DEPLOYMENT == 'development')
            return;
        if (!task.enabled)
            return;
        if (task.init)
            task.init(client);
        switch (task.taskType) {
            case ITask_1.TaskTypes.onClientEvent:
                client.addListener(task.name, (...args) => task.run(client, logger, ...args));
                break;
            case ITask_1.TaskTypes.scheduled:
                setInterval(() => task.run(client), task.interval * 1000);
                break;
            default:
                logger.log(betterjslogger_1.LogLevel.WARN, `Unknow task type of "${task.taskType}" for task: ${task.name}`);
        }
    }));
}
exports.load = load;
