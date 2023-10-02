import * as yaml from 'js-yaml'
import * as fs from 'fs'
import {
    Guild,
    ImageURLOptions,
    User,
    Client,
    Collection,
    GuildMember
} from 'discord.js'
import ICommand, { AuthLevel } from '../interfaces/ICommand'
import ICategory from '../interfaces/ICategory'
import Logger, { LogLevel } from 'betterjslogger'

export interface IServerData {
    id: string
    name: string
    prefix: string
    cooldown: number
    lastSlice: number
    modRoles: string[]
    channel: string | undefined
}

export interface IServerSlices {
    id: string
    slices: number
    displayName: string
}

export interface IOrangeData {
    // servers[server.id]
    servers: Record<string, IServerData>
    // slices[server.id][user.id]
    slices: Record<string, Record<string, IServerSlices>>

    defaultPrefix: string
    defaultCooldown: number
}

export class OrangeUtils {
    public static data: IOrangeData
    public static dataPath: string

    public static Commands: Collection<string, ICommand>
    public static Aliases: Collection<string, string>
    public static CategoriesCommands: Collection<string, string[]>
    public static Categories: Collection<string, ICategory>

    public static development = true
    // public static testers: string[] = []
    public static testers = ['487314847470714907']

    public static logger: Logger

    constructor(dataPath: string) {
        OrangeUtils.dataPath = dataPath

        const data = OrangeUtils.readFile()
        OrangeUtils.data = data

        // setInterval(OrangeUtils.writeFile, 20 * 60 * 1000)
        setInterval(OrangeUtils.writeFile, 1000)
    }

    public static checkAuthLevel(
        member: GuildMember,
        authLevel: AuthLevel
    ): boolean {
        switch (authLevel) {
            case AuthLevel.member:
                return true
            case AuthLevel.moderator:
                const serverModRoles =
                    OrangeUtils.data.servers[member.guild.id].modRoles
                if (
                    member.roles.cache
                        .map((role) => serverModRoles.includes(role.id))
                        .includes(true)
                )
                    return true
                return this.checkAuthLevel(member, AuthLevel.administrator)
            case AuthLevel.administrator:
                if (member.permissions.has('Administrator')) return true
                return this.checkAuthLevel(member, AuthLevel.owner)
            case AuthLevel.owner:
                if (member.id == member.guild.ownerId) return true
                return this.checkAuthLevel(member, AuthLevel.developer)
            case AuthLevel.developer:
                if (OrangeUtils.testers.includes(member.id)) return true
                return false
            default:
                throw new Error(`Unknown authLevel ${authLevel}!`)
        }
    }

    public static get Servers(): Record<string, IServerData> {
        return this.data.servers
    }
    public static get Slices(): Record<string, Record<string, IServerSlices>> {
        return this.data.slices
    }
    public static get DefaultPrefix(): string {
        return this.data.defaultPrefix
    }
    public static get DefaultCooldown(): number {
        return this.data.defaultCooldown
    }

    public static AddServer(guild: Guild) {
        this.data.servers[guild.id] = {
            modRoles: [],
            id: guild.id,
            lastSlice: 0,
            name: guild.name,
            channel: undefined,
            prefix: this.data.defaultPrefix,
            cooldown: Number(this.data.defaultCooldown)
        }
        this.data.slices[guild.id] = {}
    }
    public static RemoveServer(guild: Guild) {
        delete this.data.servers[guild.id]
        delete this.data.slices[guild.id]
    }

    public static AddSlice(guild: string, user: User) {
        if (!this.data.slices[guild][user.id]) {
            this.data.slices[guild][user.id] = {
                slices: 1,
                id: user.id,
                displayName: user.displayName
            }
        } else {
            this.data.slices[guild][user.id].slices += 1
        }
    }

    private static readFile(): IOrangeData {
        if (!fs.existsSync(this.dataPath)) {
            fs.writeFileSync(this.dataPath, 'servers:')
        }
        const data = yaml.load(
            fs.readFileSync(this.dataPath).toString()
        ) as IOrangeData

        if (!data['servers']) {
            data.servers = {}
        }
        if (!data['slices']) {
            data.slices = {}
        }
        if (!data['defaultCooldown']) {
            data.defaultCooldown = 60
        }
        if (!data['defaultPrefix']) {
            data.defaultPrefix = 'o!,orange!'
        }

        return data
    }
    public static writeFile(): void {
        if (!fs.existsSync(OrangeUtils.dataPath)) {
            fs.writeFileSync(OrangeUtils.dataPath, '')
        }
        const write = yaml.dump(OrangeUtils.data, {
            indent: 4
        })
        fs.writeFileSync(OrangeUtils.dataPath, write)
        OrangeUtils.data = OrangeUtils.readFile()
    }

    public static checkNewServers(client: Client): void {
        client.guilds.cache.forEach((guild) => {
            if (!this.Servers[guild.id]) {
                this.Servers[guild.id] = {
                    modRoles: [],
                    id: guild.id,
                    lastSlice: 0,
                    name: guild.name,
                    channel: undefined,
                    prefix: this.data.defaultPrefix,
                    cooldown: this.data.defaultCooldown
                }
                this.Slices[guild.id] = {}
            }
        })
        this.writeFile()
    }
}
