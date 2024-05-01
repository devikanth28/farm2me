import ApiConstant from "../../constants/api.constants";
import api from "../api";

const getUsers = async (filter: string) => {  
    try {
        const allUsers: any = await api
        .get(ApiConstant.getAllUser + filter)
        .then((result: any)=> {
            if(result)            
                return result.data;
            else
                return null;         
         })
         .catch(function (error: any) {
             console.error('error reading get users', error);
         });
        const response = allUsers != null ? allUsers : null;        
        return response;
    }
    catch (e) {
        console.log('error in getUsers');
        return [];
    } 
}

const updateUser = async (data: any) => {
    try {
        const updatedUser: any = await api
        .put(ApiConstant.updateUserDetail, data)
        .then((result: any)=> {
            if(result)            
                return result.data;
            else
                return null;         
         })
         .catch(function (error: any) {
             console.error('error updating User data', error);
         });
        const response = updatedUser != null ? updatedUser : null;        
        return response;
    }
    catch
    {
        console.log('error in edit user');
        return false;
    }
}

const deleteUser = async (userId: number) => {
    try {
        const deleteUser: any = await api
        .delete(ApiConstant.deleteUserDetail + userId)
        .then((res: any)=> {
            if(res)            
                return res.data;
            else
                return null;         
        })
        .catch(function (error: any) {
            console.error('error deleting user.', error);
        });
        const response = deleteUser != null ? deleteUser : null;        
        return response;
    }
    catch
    {
        console.log('error in delete user detail');
        return false;
    }
}

const editUserServices = {
    getUsers,
    updateUser,
    deleteUser
};

export default editUserServices;