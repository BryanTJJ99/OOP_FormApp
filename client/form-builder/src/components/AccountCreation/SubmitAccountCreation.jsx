import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SubmitAccountCreation = (props) => {
    async function handleSubmit() {
        console.log(props.accountDetails);
        await fetch("http://localhost:8080/api/admin/user/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(props.accountDetails),
        });
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
