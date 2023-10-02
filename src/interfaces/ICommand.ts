import { Client, Message } from 'discord.js'

export enum AuthLevel {
    member = 'Member',
    moderator = 'Moderator',
    administrator = 'Administrator',
    owner = 'Owner',
    developer = 'Developer'
}

export default interface ICommand {
    name: string
    category: string
    description: string
    args: string | string[]

    aliases?: string[]
    development?: boolean
    authLevel?: AuthLevel

    // Args     = String[]
    // Args1    = String
    exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ): Promise<void | Error>
}
