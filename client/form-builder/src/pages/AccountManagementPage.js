import React from "react";
import { Link } from "react-router-dom";

const AccountManagementPage = () => {
    return (
        <div>
            <Link to="/AccountCreationPage">Create Account</Link>
            <h1>Vendor profile page</h1>
        </div>
    );
};

export default AccountManagementPage;
