import React, { useState } from "react";

import { TextField } from "@mui/material";

const AccountCreationField = (props) => {
    let accountDetails = props.accountDetails;

    function generatePassword() {
        var length = 12,
            charset =
                "@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz",
            password = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        return password;
    }

    let password = "";

    if (props.field == "Password") {
        password = generatePassword();
        accountDetails[props.field.toLowerCase()] = password;
        props.setAccountDetails(accountDetails);
    }

    return (
        <TextField
            required
            id={props.field}
            label={props.field}
            variant="outlined"
            disabled={props.field == "Password" ? true : false}
            sx={{ marginBottom: "10px" }}
            inputProps={{
                autoComplete: "off",
            }}
            onChange={(e) => {
                accountDetails[props.field.toLowerCase()] = e.target.value;
                props.setAccountDetails(accountDetails);
            }}
            defaultValue={props.field == "Password" ? password : ""}
        />
    );
};

export default AccountCreationField;
