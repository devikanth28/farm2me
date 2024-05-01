import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserPermission from '../../interfaces/security/user-permission';
import SecurityService from '../../services/security/security.service';

export interface PermissionsContextType {
    canAccessSignInPage?: boolean,
};

export const PermissionsContext = createContext<PermissionsContextType>(null!);


export const PermissionsProvider = (props: any) => {

    const [canAccessSignInPage, setCanAccessSignInPage] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();

    //make acceess token saved in localstroage
    useEffect(() => {
        // UserService.getCurrentUser().then((userDetails: any) => {
        //     Helpers.ConsoleLog(userDetails);
        //     getPermissionOfCurrentUser();
        // });
    }, []);


    const getPermissionOfCurrentUser = async () => {
        var userPermissions: UserPermission = await SecurityService.getPermissionsOfCurrentUser();
        setCanAccessSignInPage(userPermissions.AccessSignInPage);
    }

    return (
        <PermissionsContext.Provider
            value={{
                canAccessSignInPage
            }}
        >
            {props.children}
        </PermissionsContext.Provider>
    );
};
