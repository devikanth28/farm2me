export interface RegisterModel {
    userID: number;
    name: string;
    primaryContactNbr: string;
    secondaryContactNbr: string;
    email: string;
    gsT_Number: string;
    referredBy: number;
    notification: boolean;
}

export interface UserModel {
  tenantGUID?: string;
  name: string;
  primaryContactNbr?: string;
  secondaryContactNbr?: string;
  email?: string;
  title?: string;
  password?: string;
  roleId?:  number;
  userID?: number;
  tenantID?: number;
  gsT_Number?: string;
  companyContactNumber?: string;
  companyName?: string;
  otp?:string;
}