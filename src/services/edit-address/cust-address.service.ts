import ApiConstant from "../../constants/api.constants";
import api from "../api";

const getAddress = async (filter: string) => {  
    try {
        const allAddress: any = await api
        .get(ApiConstant.getCustomerAddress + filter)
        .then((result: any)=> {
            if(result)            
                return result.data;
            else
                return null;         
         })
         .catch(function (error: any) {
             console.error('error reading get all address', error);
         });
        const response = allAddress != null ? allAddress : null;        
        return response;
    }
    catch (e) {
        console.log('error in getAddress');
        return [];
    } 
}

const updateAddress = async (data: any) => {
    try {
        const updatedAddress: any = await api
        .put(ApiConstant.updateCustomerAddress, data)
        .then((result: any)=> {
            if(result)            
                return result.data;
            else
                return null;         
         })
         .catch(function (error: any) {
             console.error('error updating customer address', error);
         });
        const response = updatedAddress != null ? updatedAddress : null;        
        return response;
    }
    catch
    {
        console.log('error in edit address');
        return false;
    }
}

const deleteAddress = async (userId: number) => {
    try {
        const deleteAddress: any = await api
        .delete(ApiConstant.deleteUserAddress + userId)
        .then((res: any)=> {
            if(res)            
                return res.data;
            else
                return null;         
        })
        .catch(function (error: any) {
            console.error('error deleting address.', error);
        });
        const response = deleteAddress != null ? deleteAddress : null;        
        return response;
    }
    catch
    {
        console.log('error in delete customer address');
        return false;
    }
}

const customerAddressService = {
    getAddress,
    updateAddress,
    deleteAddress
};

export default customerAddressService;