import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import axios from "axios";

const SubmitAccountCreation = (props) => {
    async function handleSubmit() {
        let accountDetails = props.accountDetails;
        switch (accountDetails["role"]) {
            case "VENDOR":
                accountDetails["role"] = "ROLE_VENDOR";
                break;
            case "ADMIN":
                accountDetails["role"] = "ROLE_ADMIN";
                break;
            case "APPROVER":
                accountDetails["role"] = "ROLE_APPROVER";
                break;
            default:
                break;
        }

        props.setAccountDetails(accountDetails);

        await axios.post(
            "http://localhost:8080/api/admin/user/create",
            // "http://localhost:8080/api/auth/createUser",
            props.accountDetails,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // console.log(props.accountDetails);
        // console.log("submitted");
        // props.setCreatedAccount(true);
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
