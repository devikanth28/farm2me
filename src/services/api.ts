import axios from "axios";
import TokenService from "./autentication/token.service";


const baseUrl = process.env.REACT_APP_SERVER_ENDPOINT;
const mainSiteUrl = process.env.REACT_APP_MVC_URL;

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;  
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);    

instance.interceptors.response.use(function (response: any) {
  return response
}, function (error) {
  const status = error?.response?.status || 0
  const resBaseURL = error?.response?.config?.baseURL
  if (resBaseURL === baseUrl && status === 401) {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      localStorage.clear()
    }

    if (mainSiteUrl)
      window.location.assign(mainSiteUrl)

    return Promise.reject(error)
  }
  return Promise.reject(error)
});

export default instance;