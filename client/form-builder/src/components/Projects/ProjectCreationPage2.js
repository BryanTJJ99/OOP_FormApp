import { React, useState, Fragment, useEffect } from "react"; //rafce
import { Button, Typography, TextField, InputAdornment } from "@mui/material";
import FormTemplate from "./FormTemplate";
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";

//Imports for material table with cards
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
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
    Grid,
} from "@mui/material";
import FullScreenDialog from "./CustomPopUp";

import { getFormTemplateData } from "../../services/ProjectCreationPageAPI";

// const apiUrl = 'http://localhost:8080/api/admin/allUsers';

const ProjectCreationPage2 = (props) => {
    const [formTemplate, setformTemplate] = useState([]);
    const [filterValue, setFilterValue] = useState(props.filterValue);
    const [rawData, setRawData] = useState();
    const [vendorData, setVendorData] = useState([]);

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
    // for table with cards######################
    // const numRows = Math.ceil(formTemplate.length / 3);
    // const rows = Array.from({ length: numRows }, (_, i) => formTemplate.slice(i * 3, i * 3 + 3));

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
                    {props.projectData.selectedForm.map((item) => (
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
                            <FullScreenDialog
                                projectData={props.projectData}
                                handleProjectDataChange={
                                    props.handleProjectDataChange
                                }
                            />
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
                            {/* <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <FilterAltIcon />
                  </Grid>
                  <Grid item>
                    <TextField id="standard-basic" label="Filter" variant="standard" value={filterValue} onChange={filter} />
                  </Grid>
                </Grid> */}
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
                                        projectData={props.projectData}
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
};

export default ProjectCreationPage2;
