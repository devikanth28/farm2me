import ApiConstant from "../../constants/api.constants";
import api from "../api";

const tenantGuid = process.env.REACT_APP_TENAT_ID;

const getAllProducts = async () => {
  const apiGetProducts = ApiConstant.getHomeProducts + tenantGuid;
  return await api
    .get(apiGetProducts)
    .then(function (response: any) {
      if (response) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch(function (error: any) {
      console.error("error reading get all categories data.", error);
    });
};

const ProductService = {
  getAllProducts,
};

export default ProductService;
