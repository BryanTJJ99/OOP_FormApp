import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AuthService from "../../services/authService";

import axios from "axios";

const SubmitAccountCreation = (props) => {
    // async function handleSubmit() {
    //     await axios.post(
    //         "http://localhost:8080/api/auth/createUser",
    //         props.accountDetails,
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         }
    //     );

    function handleSubmit() {
        const registrationData = {
            username: props.accountDetails.username,
            email: props.accountDetails.email,
            password: props.accountDetails.password,
            role: props.accountDetails.role,
            country: props.accountDetails.country,
        };

        AuthService.register(registrationData.username, registrationData.email, registrationData.password, registrationData.role, registrationData.country)
            .then((response) => {
                console.log(response.data);
                props.setCreatedAccount(true);
            })
            .catch((error) => { 
                console.log(error);
                const resmessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                console.log(resmessage);
            });


        // console.log(props.accountDetails);
        // console.log("submitted");
        
    }
    return (
        <Button
            component={Link}
            to={"/AccountManagement"}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
        >
            Submit
        </Button>
    );
};

export default SubmitAccountCreation;
