import React from "react";

import { TextField } from "@mui/material";

const AccountCreationField = (props) => {
    let accountDetails = props.accountDetails;

    return (
        <TextField
            id={props.field}
            label={props.field}
            variant="outlined"
            style={{ marginBottom: "10px" }}
            inputProps={{
                autoComplete: "off",
            }}
            onChange={(e) => {
                accountDetails[props.field] = e.target.value;
                props.setAccountDetails(accountDetails);
            }}
        />
    );
};

export default AccountCreationField;
