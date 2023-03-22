import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import axios from "axios";

const SubmitAccountCreation = (props) => {
    async function handleSubmit() {
        await axios.post(
            "http://localhost:8080/api/auth/createUser",
            props.accountDetails,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // console.log(props.accountDetails);
        // console.log("submitted");
        props.setCreatedAccount(true);
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
