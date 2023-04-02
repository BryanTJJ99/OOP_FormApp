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
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <div className="text-center my-5">
                <Typography
                    variant="h4"
                >
                    Select Forms
                </Typography>
                <Typography variant='p'>These forms will be filled by the vendors that you have indicated</Typography>
            </div>

            {/* For container showing forms that are selected */}
            <Box display={'flex'} className='mb-5'>
                <Grid container>
                    <Grid item xs={6} md={3} marginY={'auto'}>
                        <Typography variant="h6" marginY={'auto'} width='300px'>Selected Form(s):</Typography>
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <Box borderColor={'primary'} marginY='auto' display={'flex'} sx={{ flexWrap: 'wrap' }}>
                            {props.projectData.selectedForm.map((item) => (
                                <Chip
                                    label={item.name}
                                    key={item.name}
                                    sx={{
                                        m: 1,
                                        color: "white",
                                        backgroundColor: "primary.main",
                                    }}
                                />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {/* <Fragment>
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
                                backgroundColor: "secondary.main",
                            }}
                        />
                    ))}
                </Container>
            </Fragment> */}

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
                                size='small'
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
                    <TableContainer 
                        component={Paper}
                        sx={{
                            marginX:'auto',
                            "& .MuiTableCell-head":{
                            backgroundColor: "primary.main",
                            color:"white",
                            fontWeight: 'bold',
                            },
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' sx={{fontWeight: 'bold', bgcolor:'secondary.main', color:'white'}} width={300}>Name</TableCell>
                                    <TableCell align='center' sx={{fontWeight: 'bold', bgcolor:'secondary.main', color:'white'}}>Description</TableCell>
                                    <TableCell align='center' sx={{fontWeight: 'bold', bgcolor:'secondary.main', color:'white'}}>Select</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {formTemplate.map((item) => (
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
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Box
                display="flex"
                width="300px;"
                marginX="auto"
                marginY="50px"
                justifyContent="space-between"
            >
                <Button
                    onClick={() => props.setActivePage("1")}
                    variant='contained'
                    sx={{width:'100px'}}
                >
                        Back
                </Button>

                <Button
                    onClick={() => props.setActivePage("3")}
                    variant='contained'
                    sx={{width:'100px'}}
                >
                        Next
                </Button>
            </Box>
        </>
    );
};

export default ProjectCreationPage2;
