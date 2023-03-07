import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import AccountCreationFields from "../components/AccountCreation/AccountCreationFields";
import AccountCreationLogo from "../components/AccountCreation/AccountCreationLogo";
import SubmitAccountCreation from "../components/AccountCreation/SubmitAccountCreation";
// import SubmitAccountCreation from "../components/AccountCreation/SubmitAccountCreation";

const AccountCreationPage = () => {
    const [accountDetails, setAccountDetails] = useState({});

    return (
        <Box
            sx={{
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
            />
            <SubmitAccountCreation accountDetails={accountDetails} />
        </Box>
    );
};

export default AccountCreationPage;
