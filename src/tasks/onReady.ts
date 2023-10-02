import ITask, { TaskTypes } from '../interfaces/ITask'
import { Client, ActivityType } from 'discord.js'
import { readFileSync } from 'fs'
import Logger, { LogLevel } from 'betterjslogger'
import { OrangeUtils } from '../modules/utils'

const Task: ITask = {
    name: 'ready',
    enabled: true,
    taskType: TaskTypes.onClientEvent,
    description: 'Log info on the bot client when ready',
    run: async (client: Client, logger: Logger) => {
        logger.log(LogLevel.INFO, '-------------------------------------------')
        logger.log(LogLevel.INFO, `Logged in as ${client.user?.tag}!`)
        logger.log(LogLevel.INFO, `Client id: ${client.user?.id}`)
        logger.log(LogLevel.INFO, `Deployment: ${await process.env.DEPLOYMENT}`)
        logger.log(
            LogLevel.INFO,
            `Version: ${
                JSON.parse(readFileSync('./package.json').toString())['version']
            }`
        )
        logger.log(LogLevel.INFO, '-------------------------------------------')

        client.user?.setActivity(
            `🍊${OrangeUtils.DefaultPrefix.split(',')[0]}help`,
            {
                type: ActivityType.Custom
            }
        )

        OrangeUtils.checkNewServers(client)
    }
}

export default Task
