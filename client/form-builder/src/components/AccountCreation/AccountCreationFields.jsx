import React from "react";
import AccountCreationField from "./AccountCreationField";
import RoleSelect from "./RoleSelect";
import CountrySelect from "./CountrySelect";
import { Box } from "@mui/material";

const AccountCreationFields = (props) => {
    const fields = ["Username", "Email", "Password"];

    let textFields = fields.map((field) => {
        return (
            <AccountCreationField
                field={field}
                key={field}
                accountDetails={props.accountDetails}
                setAccountDetails={props.setAccountDetails}
            />
        );
    });

    return (
        <>
            {textFields}
            <Box sx={{ display: "flex" }}>
                <RoleSelect
                    accountDetails={props.accountDetails}
                    setAccountDetails={props.setAccountDetails}
                />
                <CountrySelect
                    accountDetails={props.accountDetails}
                    setAccountDetails={props.setAccountDetails}
                />
            </Box>
        </>
    );
};

export default AccountCreationFields;
