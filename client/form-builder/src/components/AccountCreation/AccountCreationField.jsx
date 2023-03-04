import React from "react";

import { TextField } from "@mui/material";

const AccountCreationField = (props) => {
    return (
        <TextField
            id={props.field}
            label={props.field}
            variant="outlined"
            style={{ marginBottom: "10px" }}
        />
    );
};

export default AccountCreationField;
