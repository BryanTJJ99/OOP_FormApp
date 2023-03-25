import { MenuItem, TextField } from "@mui/material";
import React from "react";

const RoleSelect = (props) => {
    const roles = ["VENDOR", "ADMIN", "APPROVER"];

    let accountDetails = props.accountDetails;
    accountDetails["role"] = "VENDOR";

    return (
        <TextField
            id="role"
            select
            label="Role"
            defaultValue="VENDOR"
            sx={{ margin: "0 10px 10px 0", width: "50%" }}
            onChange={(e) => {
                accountDetails["role"] = e.target.value;
                console.log(accountDetails);
                props.setAccountDetails(accountDetails);
            }}
        >
            {roles.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default RoleSelect;
