export interface OtherUserModel {
    userID: number,    
    name: string,
    primaryContactNbr: string,
    secondaryContactNbr: string,
    email: string,
    gsT_Number: string,
    isDeleted: boolean
}

export interface EditOtherUserModel {
    userID: number,
    name: string,
    primaryContactNbr: string,
    secondaryContactNbr: string,
    email: string,
    gsT_Number: string,
    referredBy: number,
    notification: boolean
}