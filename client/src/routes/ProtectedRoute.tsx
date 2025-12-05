import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../app/store";

interface ProtectedRouteProps {
  isGuestRoute?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isGuestRoute }) => {
  const isAuthenticated = useSelector((state: RootState) => 
    !!state.auth.accessToken
  );
  
  // navigation paths
  const HOME_PATH = "/"; 
  const LOGIN_PATH = "/login";


  if (!isGuestRoute) {
    if (!isAuthenticated) {
      return <Navigate to={LOGIN_PATH} replace />;
    }

    return <Outlet />; 
  }

  if (isGuestRoute) {
    if (isAuthenticated) {
      return <Navigate to={HOME_PATH} replace />;
    }
    
    return <Outlet />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
