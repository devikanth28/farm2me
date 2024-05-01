import LocalStorageConstant from "../../constants/localstroage.constant";
import Helpers from "../../utils/helpers";

const getLocalRefreshToken = (): string => {
  return localStorage.getItem(LocalStorageConstant.refreshToken)??"";
};

const getLocalAccessToken = (): string => {
  return localStorage.getItem(LocalStorageConstant.accessToken)??"" ;
};

const addOrUpdateLocalAccessToken = (token: string) => {
  localStorage.setItem(LocalStorageConstant.accessToken, token);
};

const addOrUpdateLocalRefreshToken = (token: string) => {
  localStorage.setItem(LocalStorageConstant.refreshToken, token);
};

const getUser: any = () => {
  let user: string | null = localStorage.getItem(LocalStorageConstant.user);
  return user ? JSON.parse(user) : null;
};

const setUser = (user: any) => {
  Helpers.ConsoleLog(JSON.stringify(user));
  localStorage.setItem(LocalStorageConstant.user, JSON.stringify(user) ?? "");
};

const removeUser = () => {
  localStorage.removeItem(LocalStorageConstant.userAddresses);
  localStorage.removeItem(LocalStorageConstant.user);
  localStorage.removeItem(LocalStorageConstant.accessToken);
  localStorage.removeItem(LocalStorageConstant.refreshToken);
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  addOrUpdateLocalAccessToken,
  addOrUpdateLocalRefreshToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
