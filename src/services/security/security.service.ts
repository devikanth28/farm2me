import ApiConstant from "../../constants/api.constants";
import Helpers from "../../utils/helpers";
import api from "../api";
import TokenService from "../autentication/token.service";

const getPermissionsOfCurrentUser = async () => {

    return {
        "AccessSignInPage": true,
    };
};

const SecurityService = {
    getPermissionsOfCurrentUser
};

export default SecurityService;