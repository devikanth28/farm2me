import ApiConstant from "../../constants/api.constants";
import LocalStorageConstant from "../../constants/localstroage.constant";
import api from "../api";
import Helpers from "../../utils/helpers";
import { UserModel } from "../../models/user-model";

const getCurrentUser = async () => {

  try {
    return await api
      .get(ApiConstant.getUser, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response: any) {
        if (response) {
          var userDetails = JSON.stringify(response.data);
          localStorage.setItem(LocalStorageConstant.user, userDetails);
          return response.data;
        }
        return null;
      })
      .catch(function (error) {
        Helpers.ConsoleLogError(error);
        return null;
      });
  }
  catch
  {
    console.log('error in get current user');
  }
  return null;


};

const getUserById = async (userId: number) => {

  try {
    return await api
      .get(Helpers.formatString(ApiConstant.getUserById, userId), {
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
    console.log('error in get current user');
  }
};

const updateUserProfile = async (user: UserModel, otp?: string) => {

  try {

    var otpParam = otp ? "?otp=" + otp : "";
    return await api
      .put(ApiConstant.updateUser + otpParam, user, {
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
    console.log('error in get current user');
  }
};

const UserService = {
  getUserById,
  getCurrentUser,
  updateUserProfile
};

export default UserService;