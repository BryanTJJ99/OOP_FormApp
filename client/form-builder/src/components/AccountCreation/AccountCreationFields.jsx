import React from "react";
import AccountCreationField from "./AccountCreationField";
import RoleSelect from "./RoleSelect";

const AccountCreationFields = (props) => {
    const fields = ["Name", "Email"];

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
            <RoleSelect setRole={props.setRole} />
        </>
    );
};

export default AccountCreationFields;
