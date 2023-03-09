import { MenuItem, TextField } from "@mui/material";
import React from "react";

const RoleSelect = (props) => {
    const roles = ["Vendor", "Admin", "Approver"];

    let accountDetails = props.accountDetails;
    accountDetails["role"] = "Vendor";

    return (
        <TextField
            id="role"
            select
            label="Role"
            defaultValue="Vendor"
            sx={{ marginBottom: "10px" }}
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
