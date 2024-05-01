import ApiConstant from "../../constants/api.constants";
import api from "../api";
import { ChangePasswordModel } from "../../models/authentication/change-password-model";
import { ForGotPasswordModel } from "../../models/authentication/forgot-password.model";
import { AuthenticateModel } from "../../models/authentication/validating-password-model";
import { ResetPasswordModel } from "../../models/authentication/reset-password-model";
import { RegistrationMobileSendOtpModel } from "../../models/authentication/registration-mobile-verification.model";

const resetPassword = async (resetPasswordModel: ResetPasswordModel) => {

  try {
    return await api
      .post(ApiConstant.resetPassword, resetPasswordModel, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response: any) {
        if (response) {
          console.log(response);
          return response.data;
        }
      })
      .catch(function (error) {
        return error;
      });
  }
  catch
  {
    console.log('error in change current user password');
  }
};

const changePassword = async (changePasswordModel: ChangePasswordModel) => {

  try {
    return await api
      .post(ApiConstant.changeUserPassword, changePasswordModel, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response: any) {
        if (response) {
          console.log(response);
          return response.data;
        }
      })
      .catch(function (error) {
        return error;
      });
  }
  catch
  {
    console.log('error in change current user password');
  }
};

const phonenumberUpdateSendOTP = async (forgotPasswordModel: ForGotPasswordModel) => {

  try {
    return await api
      .post(ApiConstant.sendUpdateUserOTP + "?mobileNo=" + forgotPasswordModel?.phoneNumber, null, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response: any) {
        if (response) {
          console.log(response);
          return response.data;
        }
      })
      .catch(function (error) {
        return error;
      });
  }
  catch
  {
    console.log('error in change current user password');
  }
};

const sendUserRegistrationOTP = async (registrationMobileSendOtpModel: RegistrationMobileSendOtpModel) => {
  try {
    return await api
      .post(ApiConstant.sendRegistrationVerficationOTP, registrationMobileSendOtpModel, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response: any) {
        if (response) {
          console.log(response);
          return response.data;
        }
      })
      .catch(function (error) {
        return error;
      });
  }
  catch
  {
    console.log('error in change current user password');
  }
}

const forgotPasswordSendOTP = async (forgotPasswordModel: ForGotPasswordModel) => {

  try {
    return await api
      .post(ApiConstant.sendForgotPasswordOTP + "?mobileNo=" + forgotPasswordModel?.phoneNumber, null, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response: any) {
        if (response) {
          console.log(response);
          return response.data;
        }
      })
      .catch(function (error) {
        return error;
      });
  }
  catch
  {
    console.log('error in change current user password');
  }
};


const forgotPasswordVerifyOTP = async (authenticateModel: AuthenticateModel) => {

  try {
    return await api
      .post(ApiConstant.validateOTP, authenticateModel, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response: any) {
        if (response) {
          console.log(response);
          return response.data;
        }
      })
      .catch(function (error) {
        return error;
      });
  }
  catch
  {
    console.log('error in change current user password');
  }
};




const UserPasswordService = {
  changePassword,
  resetPassword,
  forgotPasswordSendOTP,
  sendUserRegistrationOTP,
  phonenumberUpdateSendOTP,
  forgotPasswordVerifyOTP
};

export default UserPasswordService;