import LocalStorageConstant from "../../constants/localstroage.constant";

const isAdmin: any = () => {
    let user: string | null = localStorage.getItem(LocalStorageConstant.user);
    var userDetails = user ? JSON.parse(user) : null;

    return userDetails && (userDetails.roleID == 1 || userDetails.roleID == 2)  ;
};

const isCustomer: any = () => {
    let user: string | null = localStorage.getItem(LocalStorageConstant.user);
    var userDetails = user ? JSON.parse(user) : null;

    return userDetails && userDetails.roleID == 3  ;
};


const RoleService = {
    isAdmin,
    isCustomer
};

export default RoleService;
