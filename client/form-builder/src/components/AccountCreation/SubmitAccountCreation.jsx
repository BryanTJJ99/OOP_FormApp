import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { authRegister, getCurrentUser } from "../../services/AuthService";

// import axios from "axios";

const SubmitAccountCreation = (props) => {
    const navigate = useNavigate();
    let accountDetails = props.accountDetails;

    function handleSubmit() {
        let accountDetailsKeys = Object.keys(accountDetails);
        if (accountDetailsKeys.length < 6) {
            props.setSnackbar({
                children: "Please fill in all the fields",
                severity: "error",
            });
            return;
        }
        props.setSnackbar(null);

        const registrationData = {
            username: accountDetails.username,
            name: accountDetails.name,
            email: accountDetails.email,
            password: accountDetails.password,
            role: accountDetails.role,
            country: accountDetails.country,
        };

        console.log(registrationData);

        const currentUser = getCurrentUser();

        authRegister(
            registrationData.username,
            registrationData.name,
            registrationData.email,
            registrationData.password,
            registrationData.role,
            registrationData.country,
            currentUser
        )
            .then((response) => {
                console.log(response.data);
                props.setCreatedAccount("true");
                navigate("/AccountManagement");
            })
            .catch((error) => {
                console.log(error);
                const errorMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(errorMessage);
            });
    }
    return (
        <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
        </Button>
    );
};

export default SubmitAccountCreation;
