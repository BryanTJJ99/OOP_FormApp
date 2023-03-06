import { MenuItem, TextField } from "@mui/material";
import React from "react";

const RoleSelect = () => {
    const roles = ["Vendor", "Admin", "Approver"];

    return (
        <TextField
            id="role"
            select
            label="Role"
            defaultValue="Vendor"
            style={{ marginBottom: "10px" }}
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
