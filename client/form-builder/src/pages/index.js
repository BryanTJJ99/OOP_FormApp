// import React from 'react';

// const Home = () => {
//     return (
//         <div>
//             <h1>Welcome to Home</h1>
//         </div>
//     );
// };

// export default Home;


import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/authService";

const Home = () => {
    const navigate = useNavigate();

    const logout = () => {
        AuthService.logout().then((data) => {
            if (data.success) {
                navigate("/login");
            }
        });
    };
    return (
        // Public Home Page showing the link to Login
        <div>
            <h1>Welcome to Home</h1>
            <Link to="/login">Login</Link>
            <br />
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Home;