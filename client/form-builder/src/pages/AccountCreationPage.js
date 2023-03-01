import React from "react";

import AccountCreationFields from "../components/AccountCreation/AccountCreationFields";
import AccountCreationLogo from "../components/AccountCreation/AccountCreationLogo";
import SubmitAccountCreation from "../components/AccountCreation/SubmitAccountCreation";

const AccountCreationPage = () => {
    return (
        <div
            style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                width: "60%",
                margin: "auto",
            }}
        >
            <AccountCreationLogo />
            <AccountCreationFields />
            <SubmitAccountCreation />
        </div>
    );
};

export default AccountCreationPage;
