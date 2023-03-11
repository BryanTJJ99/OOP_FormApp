import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SubmitAccountCreation = (props) => {
    return (
        <Button
            component={Link}
            to={"/AccountManagement"}
            variant="contained"
            color="primary"
            onClick={() => {
                console.log("submitted");
                console.log(props.accountDetails);
                // this function will send the information to the backend to create a new user and then redirects user to account management page
            }}
        >
            Submit
        </Button>
    );
};

export default SubmitAccountCreation;
