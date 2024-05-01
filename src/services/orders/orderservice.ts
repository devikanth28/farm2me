import ApiConstant from "../../constants/api.constants";
import api from "../api";

const getOrders = async (filter: string) => {  
    try {
        const Orders: any = await api
        .get(ApiConstant.getAllOrder + filter)
        .then((result: any)=> {
            if(result)            
                return result.data;
            else
                return null;         
         })
         .catch(function (error: any) {
             console.error('error reading get orders data.', error);
         });
        const response = Orders != null ? Orders : null;        
        return response;
    }
    catch (e) {
        console.log('error in getOrders');
        return [];
    } 
}

const getOrderUsers = async (filter: string) => {  
    try {
        const Users: any = await api
        .get(ApiConstant.getOrderUserList + filter)
        .then((result: any)=> {
            if(result)            
                return result.data;
            else
                return null;         
         })
         .catch(function (error: any) {
             console.error('error reading get order user list data.', error);
         });
        const response = Users != null ? Users : null;        
        return response;
    }
    catch (e) {
        console.log('error in getUserMobileData');
        return [];
    } 
}

const orderServices = {
    getOrders,
    getOrderUsers
};

export default orderServices;