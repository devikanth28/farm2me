import { CourierProviderMock } from "./courier-provider-mock";
import ApiConstant from "../../constants/api.constants";
import api from "../api";

const getCourierProviders = async () => {
  try {
    const response = CourierProviderMock;
    return response;
  } catch (error) {
    console.error("error reading courier providers data.", error);
    throw error;
  }
};

const getAllCourierProviders = async () => {
  const apiGetAllCourierProviders = ApiConstant.getAllCourierProviders;
  return await api
    .get(apiGetAllCourierProviders)
    .then(function (response: any) {
      if (response) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch(function (error: any) {
      console.error("error reading get all courier provider data.", error);
    });
};

const CourierProviderService = {
  getCourierProviders,
  getAllCourierProviders,
};

export default CourierProviderService;
