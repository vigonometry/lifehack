import { Chat } from "./chat.type";

export interface User {
    _id:string
    _typename: string,
    username: string,
    email: string,
    password: string,
    institution: string | null,
    course: string | null,
    chat: Chat[],
    isClient:boolean
}
