export interface RouteCodeUser {
    userAddressID: number,
    userID: number,    
    userName: string,
    primaryContactNbr: string,
    address1: string,
    address2: string,
    landmark: string,
    cityName: string,
    stateName: string,
    routeCodeID: number,
    routeCodeName: string
}

export interface AssignCode {
    userAddressID: number,
    routeCodeID: number
}