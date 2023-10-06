import { Client, Message } from 'discord.js'
import ICommand from '../../interfaces/ICommand'
import { OrangeUtils } from '../../modules/utils'
import { LogLevel } from 'betterjslogger'

const command: ICommand = {
    name: 'rand',
    category: 'rand',
    description: 'DM a random person mentioned!',
    args: ['count', '...users'],
    async exec(
        client: Client,
        message: Message,
        args: string[],
        args1: string
    ) {
        const mentions = message.mentions.users.map((user) => user)
        const count = Number(args[0])
        const shareChosen = args[1] == '1' ? true : false

        if (mentions.length < count + 1) {
            message.reply(`Please mention at least ${count + 1} users!`)
            return
        }

        const users = []
        const used = [-1]

        for (var i = 0; i < count; i++) {
            var index = -1
            while (used.includes(index)) {
                index = Math.floor(Math.random() * mentions.length)
            }
            const randUser = mentions[index]
            users.push(randUser)
            used.push(index)
        }

        for (const user of users) {
            const dm = await user.createDM()
            if (shareChosen) {
                const userList = users.map((user) => user.displayName)
                userList.filter((_user) => _user !== user.displayName)
                let last
                if (userList.length > 1) {
                    last = userList.pop()
                }
                await dm.send(
                    `You have been chosen along with ${
                        last
                            ? userList[0]
                            : `${userList.join(', ')} and ${last}`
                    }.`
                )
            } else {
                await dm.send('You have been chosen!')
            }
            OrangeUtils.logger.log(
                LogLevel.INFO,
                `${user.displayName} (${user.id}) has been chosen!`
            )
        }

        message.reply(`${count} user(s) has been chosen!`)
    }
}

export default command
