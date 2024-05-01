// getMyOrderList
import ApiConstant from "../../constants/api.constants";
import api from "../api";

const getMyOrders = async (filter: string) => {  
    try {
        const Orders: any = await api
        .get(ApiConstant.getMyOrderList + filter)
        .then((result: any)=> {
            if(result)            
                return result.data;
            else
                return null;         
         })
         .catch(function (error: any) {
             console.error('error reading get my orders.', error);
         });
        const response = Orders != null ? Orders : null;        
        return response;
    }
    catch (e) {
        console.log('error in getMyOrders');
        return [];
    } 
}

const updateOrderStatus = async (data: any) => {
    try {
        const res: any = await api
        .put(ApiConstant.updateOrderStatus, data)
        .then((result: any)=> {
            if(result)            
                return result.data;
            else
                return null;         
         })
         .catch(function (error: any) {
             console.error('error updating order status', error);
         });
        const response = res != null ? res : null;        
        return response;
    }
    catch
    {
        console.log('error in update order status');
        return false;
    }
}

const myOrderServices = {
    getMyOrders,
    updateOrderStatus
};

export default myOrderServices;