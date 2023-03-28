import { Alert, Box, Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import AccountCreationFields from "../components/AccountCreation/AccountCreationFields";
import AccountCreationLogo from "../components/AccountCreation/AccountCreationLogo";
import SubmitAccountCreation from "../components/AccountCreation/SubmitAccountCreation";

const AccountCreationPage = (props) => {
    const [accountDetails, setAccountDetails] = useState({});
    const [snackbar, setSnackbar] = useState(null);


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
            <SubmitAccountCreation
                accountDetails={accountDetails}
                setAccountDetails={setAccountDetails}
                setCreatedAccount={props.setCreatedAccount}
                setSnackbar={setSnackbar}
                snackbar={snackbar}
            />
            {!!snackbar && (
                <Snackbar
                    open
                    onClose={() => setSnackbar(null)}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={() => setSnackbar(null)} />
                </Snackbar>
            )}
        </Box>
    );
};

export default AccountCreationPage;
