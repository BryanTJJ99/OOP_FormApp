import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import AccountCreationFields from "../components/AccountCreation/AccountCreationFields";
import AccountCreationLogo from "../components/AccountCreation/AccountCreationLogo";
// import SubmitAccountCreation from "../components/AccountCreation/SubmitAccountCreation";

const AccountCreationPage = () => {
    const [accountDetails, setAccountDetails] = useState({});
    const [role, setRole] = useState("");

    return (
        <Box
            style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                width: "60%",
                margin: "auto",
            }}
        >
            <AccountCreationLogo />
            <AccountCreationFields
                accountDetails={accountDetails}
                setAccountDetails={setAccountDetails}
                setRole={setRole}
            />
            <Button
                component={Link}
                to={"/AccountManagementPage"}
                variant="contained"
                color="primary"
                onClick={() => {
                    console.log("submitted");
                    console.log(accountDetails);
                    console.log(role);
                    // this function will send the information to the backend to create a new user
                }}
            >
                Submit
            </Button>
        </Box>
    );
};

export default AccountCreationPage;
