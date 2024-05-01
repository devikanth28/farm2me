import { Outlet, Navigate } from 'react-router-dom';
import RouteConstant from '../../constants/route.constants';
import AuthService from '../../services/autentication/auth.service';

interface PrivateRouteProps {
    isAuthenticationRequired: boolean;
}
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticationRequired }) => {
    const isAuth = AuthService.isUserLoggedIn();

    if (isAuthenticationRequired) {
        return isAuth ? <Outlet /> : <Navigate to={RouteConstant.login} />;
    } else {
        // return !isAuth ? <Outlet /> : <Navigate to={RouteConstant.products} />;
        return <Outlet/>;
    }
}
