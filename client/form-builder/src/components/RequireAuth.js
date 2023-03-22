import { useLocation, Navigate, Outlet } from "react-router-dom";

import AuthService from "../services/authService";

const RequireAuth = ({ allowedRoles }) => {
    const user = AuthService.getCurrentUser();
    const location = useLocation();
    
    // if the user is not logged in, redirect to the login page
    if (!user) {
        return <Navigate to={{ pathname: "/", state: { from: location } }} />;
    }

    return <Outlet />;
};

export default RequireAuth;