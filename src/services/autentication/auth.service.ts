import ApiConstant from "../../constants/api.constants";
import Token from "../../interfaces/authorization/token";
import { LoginModel } from "../../models/login-model";
import { UserModel } from "../../models/user-model";
import Helpers from "../../utils/helpers";
import api from "../api";
import TokenService from "./token.service";
import { TokenRefreshModel } from "../../models/authentication/token-refresh-model";
import UserService from "../user/user.service";

const logout = () => {
  TokenService.removeUser();
};

const isUserLoggedIn = () => {
  return TokenService.getUser() != null;
};

const login = async (login: LoginModel) => {
  return await api
    .post(
      ApiConstant.getToken,
      { userId: login.userId, password: login.password },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then(async function (response: any) {
      if (response) {
        let data: Token = response.data;

        TokenService.addOrUpdateLocalRefreshToken(data?.refresh_token);
        TokenService.addOrUpdateLocalAccessToken(data?.access_token);
        await UserService.getCurrentUser();
        return data;
      }
    })
    .catch(function (error) {
      Helpers.ConsoleLog(error, "error");
      return error?.response?.data;
    });
};

const register = async (user: UserModel) => {
  return await api
    .post(ApiConstant.userRegister, user, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then(function (response: any) {
      if (response) {
        return response.data;
      }
    })
    .catch(function (error) {
      Helpers.ConsoleLog(error, "error");
      return error;
    });
};

const createUser = async (user: UserModel) => {
  return await api
    .post(ApiConstant.createUser, user, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then(function (response: any) {
      if (response) {
        return response.data;
      }
    })
    .catch(function (error) {
      Helpers.ConsoleLog(error, "error");
      return error;
    });
};

const refreshTokenFromServer = async () => {
  var refreshModel: TokenRefreshModel = {
    accessToken: TokenService.getLocalAccessToken(),
    refreshToken: TokenService.getLocalRefreshToken(),
  };
  await api
    .post(ApiConstant.getRefreshToken, refreshModel, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then(function (response: any) {
      if (response) {
        let data: Token = response.data;
        TokenService.addOrUpdateLocalRefreshToken(data?.refresh_token);
        TokenService.addOrUpdateLocalAccessToken(data?.access_token);
      }
    })
    .catch(function (error) {
      Helpers.ConsoleLog(error, "error");
    });
};

const AuthService = {
  logout,
  isUserLoggedIn,
  refreshTokenFromServer,
  login,
  register,
  createUser
};

export default AuthService;
