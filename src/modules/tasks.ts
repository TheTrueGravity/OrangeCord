import { readdirSync, PathLike } from 'fs'
import { Collection, Client } from 'discord.js'
import ITask, { TaskTypes } from '../interfaces/ITask'
import { AsciiTable3 } from 'ascii-table3'
import Logger, { LogLevel } from 'betterjslogger'
import { OrangeUtils } from './utils'

export function load(client: Client, logger: Logger, taskDir: PathLike) {
    const tasks: Collection<string, ITask> = new Collection()
    const table = new AsciiTable3('Tasks').setHeading('Task', 'Load status')

    const dir = readdirSync(taskDir)
    const _tasks = dir.filter((f) => f.endsWith('.js'))

    for (var file of _tasks) {
        let req = require(`${taskDir}/${file.split('.')[0]}`)
        const task: ITask = req.default

        if (task.name) {
            tasks.set(task.name, task)
            table.addRow(file, '✅')
        } else {
            table.addRow(file, '❌ -> missing something?')
            continue
        }
    }

    logger.log(LogLevel.VERBOSE, table.toString())

    tasks.forEach(async (task) => {
        if (task.development && process.env.DEPLOYMENT == 'development') return
        if (!task.enabled) return

        if (task.init) task.init(client)

        switch (task.taskType) {
            case TaskTypes.onClientEvent:
                client.addListener(task.name, (...args) =>
                    task.run(client, logger, ...args)
                )
                break
            case TaskTypes.scheduled:
                setInterval(
                    () => task.run(client),
                    (task.interval as number) * 1000
                )
                break
            default:
                logger.log(
                    LogLevel.WARN,
                    `Unknow task type of "${task.taskType}" for task: ${task.name}`
                )
        }
    })
}
