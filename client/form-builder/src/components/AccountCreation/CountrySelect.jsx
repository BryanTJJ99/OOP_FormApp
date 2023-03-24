import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

import countries from "./Countries";

function CountrySelect(props) {
    let accountDetails = props.accountDetails;

    function sortByCountryName(countriesArr) {
        let newCountriesArr = countriesArr.sort((a, b) => {
            let country1 = a.label;
            let country2 = b.label;
            return country1.localeCompare(country2);
        });
        return newCountriesArr;
    }

    return (
        <Autocomplete
            disablePortal
            id="countrySelect"
            options={sortByCountryName(countries)}
            sx={{ width: "50%" }}
            value={accountDetails["country"]}
            autoHighlight
            onChange={(event, newValue) => {
                accountDetails["country"] = newValue.label;
                console.log(accountDetails);
                props.setAccountDetails(accountDetails);
            }}
            renderInput={(params) => (
                <TextField {...params} label="Countries" />
            )}
        />
    );
}

export default CountrySelect;
