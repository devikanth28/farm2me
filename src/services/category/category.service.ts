import api from "../api";
import ApiConstant from "../../constants/api.constants";

const tenantGuid = process.env.REACT_APP_TENAT_ID;

const getAllCategories = async () => {

    const apiGetHomeCategories = ApiConstant.getHomeCategories + tenantGuid;
    return await api
        .get(apiGetHomeCategories)
        .then(function (response: any) {
            if (response) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch(function (error: any) {
            console.error('error reading get all categories data.', error);
        });

   
}

const CategoryService = {
    getAllCategories
};

export default CategoryService;