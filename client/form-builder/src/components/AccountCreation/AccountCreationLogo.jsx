import React from "react";
import { Box } from '@mui/material'
import QuantumLeapLogo from "../../assets/QuantumLeapLogo.png";

const AccountCreationLogo = () => {
    return (
        <Box sx={{my:3}}>
            <img
                src={QuantumLeapLogo}
                alt="QuantumLeap Logo"
                width={"70%"}
                style={{ display: "block", margin: "auto" }}
                
            />
        </Box>
    );
};

export default AccountCreationLogo;
