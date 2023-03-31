// this helps you add additional forms to your project for a selected vendor

import React, { useState, Fragment, useEffect } from "react"; //rafce
import { Button, Typography, TextField, InputAdornment, CssBaseline, Container, Box,
Card,
CardContent,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Paper,
Chip,
Grid, } from "@mui/material";
import {
FilterAlt as FilterAltIcon,
Add as AddIcon
} from "@mui/icons-material";
import FormTemplate from "../components/Projects/FormTemplate";
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

import FullScreenDialog from "../components/Projects/CustomPopUp";

import { getFormTemplateData } from "../services/ProjectCreationPageAPI";
import { useLocation } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';



function AddFormProject(props) {
    const [formTemplate, setformTemplate] = useState([]);
    const [filterValue, setFilterValue] = useState(props.filterValue);
    const [rawData, setRawData] = useState();
    const [vendorData, setVendorData] = useState([]);
    const [selectedForm, setSelectedForm] = useState([]);
    const [projectData, setProjectData] = useState({});

    const [searchParams] = useSearchParams();

    const projectId = searchParams.get("projectId");
    const selectedVendorId= searchParams.get("selectedVendorId");
    console.log(projectId);
    console.log(selectedVendorId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let forms = await getFormTemplateData();
                console.log(forms);
                // console.log(vendorData)
                // setformTemplate(forms);
                setRawData(forms);
                setformTemplate(forms);
                // console.log(vendorData);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, []);

    // For building filter logic
    function filter(event) {
        // console.log(event.target.value)
        let filter_value = event.target.value;
        let filtered_forms = [];
        for (var form of rawData) {
            let slice = form.formName
                .toLowerCase()
                .slice(0, filter_value.length);
            if (slice == filter_value.toLowerCase()) {
                filtered_forms.push(form);
            }
        }
        setformTemplate(filtered_forms);
    }

    console.log(rawData);
    console.log(formTemplate);

    return (
        <>
            <Box sx={{ height: 50 }}></Box>

            <Typography
                variant="h4"
                component="div"
                style={{ flexGrow: 1, margin: 30 }}
            >
                Select Forms To Be Filled By Vendor(s)
            </Typography>

            {/* For container showing forms that are selected */}
            <Fragment>
                <CssBaseline />
                <Container
                    maxWidth="sm"
                    sx={{
                        backgroundColor: "#1F87BC",
                        color: "#FFFFFF",
                        borderRadius: "20px",
                        padding: 1,
                    }}
                >
                    <Typography variant="h6">Selected Form(s)</Typography>
                    {selectedForm.map((item) => (
                        <Chip
                            label={item.name}
                            key={item.name}
                            sx={{
                                m: 1,
                                color: "#FFFFFF",
                                backgroundColor: "#7F7F7F",
                            }}
                        />
                    ))}
                </Container>
            </Fragment>

            <br />
            <br />

            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={1}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            {/* <FullScreenDialog
                                projectData={props.projectData}
                                handleProjectDataChange={
                                    props.handleProjectDataChange
                                }
                            /> */}
                        </Grid>
                        <Grid item>
                            <TextField
                                id="standard-basic"
                                label="Filter by name"
                                variant="filled"
                                sx={{ height: 30, m: 3 }}
                                value={filterValue}
                                onChange={filter}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <FilterAltIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Grid
                            container
                            spacing={2}
                            justifyContent="center"
                            style={{ height: "100%" }}
                            overflow="auto"
                        >
                            {formTemplate.map((item) => (
                                <Grid
                                    key={item.formTemplateId}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <FormTemplate
                                        id={item.formTemplateId}
                                        name={item.formName}
                                        // url={item.imageurl}
                                        description={item.formDescription}
                                        projectData={selectedForm}
                                        handleProjectDataChange={
                                            props.handleProjectDataChange
                                        }
                                    >
                                        {item}
                                    </FormTemplate>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </Grid>
            </Grid>

            <br />
            <br />
            <Box
                display="flex"
                width="300px;"
                marginX="auto"
                marginY="50px"
                justifyContent="space-between"
            >
                <Button
                    onClick={() => props.setActivePage("1")}
                    style={{
                        backgroundColor: "#1F87BC",
                        color: "white",
                        height: 50,
                        width: 100,
                    }}
                >
                    <Typography sx={{ fontSize: "14px", m: 1 }}>
                        Back
                    </Typography>
                </Button>

                <Button
                    onClick={() => props.setActivePage("3")}
                    style={{
                        backgroundColor: "#1F87BC",
                        color: "white",
                        height: 50,
                        width: 100,
                    }}
                >
                    <Typography sx={{ fontSize: "14px", m: 1 }}>
                        Next
                    </Typography>
                </Button>
            </Box>
        </>
    );
}

export default AddFormProject