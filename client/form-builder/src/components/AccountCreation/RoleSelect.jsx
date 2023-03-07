import { MenuItem, TextField } from "@mui/material";
import React from "react";

const RoleSelect = (props) => {
    const roles = ["Vendor", "Admin", "Approver"];

    return (
        <TextField
            id="role"
            select
            label="Role"
            defaultValue="Vendor"
            sx={{ marginBottom: "10px" }}
            onChange={(e) => props.setRole(e.target.value)}
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
