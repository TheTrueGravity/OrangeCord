import { Client } from 'discord.js'

export enum TaskTypes {
    onClientEvent = 'onClientEvent',
    scheduled = 'scheduled'
}

export default interface ITask {
    name: string
    enabled: boolean
    interval?: number
    taskType: TaskTypes
    description: string
    development?: boolean
    init?: (client: Client) => Promise<void>
    run: (client: Client, ...args: any[]) => void
}
