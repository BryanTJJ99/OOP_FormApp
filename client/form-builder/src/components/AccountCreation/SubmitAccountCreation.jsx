import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";

// import axios from "axios";

const SubmitAccountCreation = (props) => {
  function handleSubmit() {
    const registrationData = {
      username: props.accountDetails.username,
      name: props.accountDetails.name,
      email: props.accountDetails.email,
      password: props.accountDetails.password,
      role: props.accountDetails.role,
      country: props.accountDetails.country,
    };

    AuthService.register(
      registrationData.username,
      registrationData.name,
      registrationData.email,
      registrationData.password,
      registrationData.role,
      registrationData.country
    )
      .then((response) => {
        console.log(response.data);
        props.setCreatedAccount(true);
      })
      .catch((error) => {
        console.log(error);
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(errorMessage);
      });

    // async function handleSubmit() {
    //     let accountDetails = props.accountDetails;
    //     switch (accountDetails["role"]) {
    //         case "VENDOR":
    //             accountDetails["role"] = "ROLE_VENDOR";
    //             break;
    //         case "ADMIN":
    //             accountDetails["role"] = "ROLE_ADMIN";
    //             break;
    //         case "APPROVER":
    //             accountDetails["role"] = "ROLE_APPROVER";
    //             break;
    //         default:
    //             break;
    //     }

    //     props.setAccountDetails(accountDetails);

    //     await axios.post(
    //         "http://localhost:8080/api/admin/user/create",
    //         // "http://localhost:8080/api/auth/createUser",
    //         props.accountDetails,
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         }
    //     );
    //     // console.log(props.accountDetails);
    //     // console.log("submitted");
    //     // props.setCreatedAccount(true);
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
