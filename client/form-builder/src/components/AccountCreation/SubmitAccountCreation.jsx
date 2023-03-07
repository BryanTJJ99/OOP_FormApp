import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SubmitAccountCreation = () => {
    return (
        <Button
            component={Link}
            to={"/AccountManagementPage"}
            variant="contained"
            color="primary"
            onClick={() => {
                console.log("submitted");
                // this function will send the information to the backend to create a new user and then redirects user to account management page
            }}
        >
            Submit
        </Button>
    );
};

export default SubmitAccountCreation;
