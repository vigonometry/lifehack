import { User } from "../types/user.type"

export const isClient = (user: User | null | undefined) => {
    return !user ? false : user._typename === 'Client'
}

export const isCounsellor = (user: User | null | undefined) => {
    return !user ? false : user._typename === 'Counsellor'
}