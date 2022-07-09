export interface Chat {
    _id: string | null,
    clientId: string,
    counsellorId: string,
    messages: string[] | undefined
}