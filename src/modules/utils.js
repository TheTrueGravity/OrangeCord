"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrangeUtils = void 0;
const yaml = __importStar(require("js-yaml"));
const fs = __importStar(require("fs"));
const ICommand_1 = require("../interfaces/ICommand");
class OrangeUtils {
    constructor(dataPath) {
        OrangeUtils.dataPath = dataPath;
        const data = OrangeUtils.readFile();
        OrangeUtils.data = data;
        // setInterval(OrangeUtils.writeFile, 20 * 60 * 1000)
        setInterval(OrangeUtils.writeFile, 1000);
    }
    static checkAuthLevel(member, authLevel) {
        switch (authLevel) {
            case ICommand_1.AuthLevel.member:
                return true;
            case ICommand_1.AuthLevel.moderator:
                const serverModRoles = OrangeUtils.data.servers[member.guild.id].modRoles;
                if (member.roles.cache
                    .map((role) => serverModRoles.includes(role.id))
                    .includes(true))
                    return true;
                return this.checkAuthLevel(member, ICommand_1.AuthLevel.administrator);
            case ICommand_1.AuthLevel.administrator:
                if (member.permissions.has('Administrator'))
                    return true;
                return this.checkAuthLevel(member, ICommand_1.AuthLevel.owner);
            case ICommand_1.AuthLevel.owner:
                if (member.id == member.guild.ownerId)
                    return true;
                return this.checkAuthLevel(member, ICommand_1.AuthLevel.developer);
            case ICommand_1.AuthLevel.developer:
                if (OrangeUtils.testers.includes(member.id))
                    return true;
                return false;
            default:
                throw new Error(`Unknown authLevel ${authLevel}!`);
        }
    }
    static get Servers() {
        return this.data.servers;
    }
    static get Slices() {
        return this.data.slices;
    }
    static get DefaultPrefix() {
        return this.data.defaultPrefix;
    }
    static get DefaultCooldown() {
        return this.data.defaultCooldown;
    }
    static AddServer(guild) {
        this.data.servers[guild.id] = {
            modRoles: [],
            id: guild.id,
            lastSlice: 0,
            name: guild.name,
            channel: undefined,
            prefix: this.data.defaultPrefix,
            cooldown: Number(this.data.defaultCooldown)
        };
        this.data.slices[guild.id] = {};
    }
    static RemoveServer(guild) {
        delete this.data.servers[guild.id];
        delete this.data.slices[guild.id];
    }
    static AddSlice(guild, user) {
        if (!this.data.slices[guild][user.id]) {
            this.data.slices[guild][user.id] = {
                slices: 1,
                id: user.id,
                displayName: user.displayName
            };
        }
        else {
            this.data.slices[guild][user.id].slices += 1;
        }
    }
    static readFile() {
        if (!fs.existsSync(this.dataPath)) {
            fs.writeFileSync(this.dataPath, 'servers:');
        }
        const data = yaml.load(fs.readFileSync(this.dataPath).toString());
        if (!data['servers']) {
            data.servers = {};
        }
        if (!data['slices']) {
            data.slices = {};
        }
        if (!data['defaultCooldown']) {
            data.defaultCooldown = 60;
        }
        if (!data['defaultPrefix']) {
            data.defaultPrefix = 'o!,orange!';
        }
        return data;
    }
    static writeFile() {
        if (!fs.existsSync(OrangeUtils.dataPath)) {
            fs.writeFileSync(OrangeUtils.dataPath, '');
        }
        const write = yaml.dump(OrangeUtils.data, {
            indent: 4
        });
        fs.writeFileSync(OrangeUtils.dataPath, write);
        OrangeUtils.data = OrangeUtils.readFile();
    }
    static checkNewServers(client) {
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
                };
                this.Slices[guild.id] = {};
            }
        });
        this.writeFile();
    }
}
OrangeUtils.development = true;
// public static testers: string[] = []
OrangeUtils.testers = ['487314847470714907'];
exports.OrangeUtils = OrangeUtils;
