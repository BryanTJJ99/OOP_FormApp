import React from "react";
import AccountCreationField from "./AccountCreationField";
import RoleSelect from "./RoleSelect";

const AccountCreationFields = (props) => {
    const fields = ["Username", "Email"];

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
            <RoleSelect
                accountDetails={props.accountDetails}
                setAccountDetails={props.setAccountDetails}
            />
        </>
    );
};

export default AccountCreationFields;
