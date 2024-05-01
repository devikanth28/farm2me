import ApiConstant from "../../constants/api.constants";
import api from "../api";

const getRouteCodes = async () => {  
    try {
        const RouteCodes: any = await api
        .get(ApiConstant.getRouteCodesApi)
        .then((result: any)=> {
            if(result)            
                return result.data;
            else
                return null;         
         })
         .catch(function (error: any) {
             console.error('error reading get route code data.', error);
         });
        const response = RouteCodes != null ? RouteCodes : null;        
        return response;
    }
    catch (e) {
        console.log('error in getRouteCodes');
        return [];
    } 
}

const getUsers = async (filter: string) => {  
    try {
        const routeCodeUsers: any = await api
        .get(ApiConstant.getRouteCodeUsers + filter)
        .then((result: any)=> {
            if(result)            
                return result.data;
            else
                return null;         
         })
         .catch(function (error: any) {
             console.error('error reading get route code data.', error);
         });
        const response = routeCodeUsers != null ? routeCodeUsers : null;        
        return response;
    }
    catch (e) {
        console.log('error in getRouteCodes');
        return [];
    } 
}

const assignRouteCode = async (data: any) => {
    try {
        const userRouteCode: any = await api
        .put(ApiConstant.assignUserRouteCode, data)
        .then((result: any)=> {
            if(result)            
                return result.data;
            else
                return null;         
         })
         .catch(function (error: any) {
             console.error('error updating route code data', error);
         });
        const response = userRouteCode != null ? userRouteCode : null;        
        return response;
    }
    catch
    {
        console.log('error in edit route code');
        return false;
    }
}

const routeCodeServices = {
    getRouteCodes,
    getUsers,
    assignRouteCode
};

export default routeCodeServices;