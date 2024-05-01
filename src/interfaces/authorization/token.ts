export default interface Token {
    expires_in: string,
    access_token: string,
    refresh_token: string,
    token_type?: string,
    userName?:string
}