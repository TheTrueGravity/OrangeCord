import { AuthLevel } from './ICommand'

export default interface ICategory {
    name: string
    description: string
    authLevel: AuthLevel

    mod?: boolean
    development?: boolean
}
