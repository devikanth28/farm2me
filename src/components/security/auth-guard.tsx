import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface AuthGuardProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  children: React.ReactNode; // This will allow passing children to the AuthGuard
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  isAuthenticated,
  authenticationPath,
  children,
  ...routeProps
}) => {
  if (!isAuthenticated) {
    return <Navigate to={authenticationPath} replace />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default AuthGuard;
