import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import axios from "axios";

const SubmitAccountCreation = (props) => {
    async function handleSubmit() {
        await axios.post(
            "http://localhost:8080/api/admin/user/create",
            props.accountDetails,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        props.setCreatedAccount(true);
        console.log("submitted");
    }
    return (
        <Button
            component={Link}
            to={"/AccountManagement"}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
        >
            Submit
        </Button>
    );
};

export default SubmitAccountCreation;
