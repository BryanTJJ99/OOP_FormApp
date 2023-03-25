import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthService from "../../services/AuthService";

const RequireAuth = ({ allowedRoles }) => {
    const user = AuthService.getCurrentUser();
    console.log(user);
    const location = useLocation();
    
    // ternary operator to check if the user is logged in and if the user has the correct role
    return user ? (allowedRoles.some(role => user.roles.includes(role)) ? <Outlet /> : <Navigate to={{ pathname: "/Unauthorized", state: { from: location } }} />) : <Navigate to={{ pathname: "/", state: { from: location } }} />;

};

export default RequireAuth;