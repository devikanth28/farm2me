export interface ChangePasswordModel {
  userID?: number;
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}