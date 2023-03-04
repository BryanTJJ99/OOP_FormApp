import React from "react";
import AccountCreationField from "./AccountCreationField";
import RoleSelect from "./RoleSelect";

const AccountCreationFields = () => {
    const fields = ["Name", "Email", "Project"];

    let textFields = fields.map((field) => {
        return <AccountCreationField field={field} />;
    });

    return (
        <>
            {textFields}
            <RoleSelect />
        </>
    );
    // return <AccountCreationField />;
};

export default AccountCreationFields;
