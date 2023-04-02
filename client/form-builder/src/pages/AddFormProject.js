// this helps you add additional forms to your project for a selected vendor

import React, { useState, Fragment, useEffect } from "react"; //rafce
import {
    Button,
    Typography,
    TextField,
    InputAdornment,
    CssBaseline,
    Container,
    Box,
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
import {
    FilterAlt as FilterAltIcon,
    Add as AddIcon,
} from "@mui/icons-material";
import FormTemplate from "../components/Projects/FormTemplate";
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

import FullScreenDialog from "../components/Projects/CustomPopUp";

import { getFormTemplateData } from "../services/ProjectCreationPageAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    getFormResponsesByVendorIdAndProjectId,
    getProjectById,
} from "../services/ProjectViewAPI";
import { getUserById } from "../services/User";
import EditProjectFormTemplateCard from "../components/Projects/EditProjectFormTemplateCard";
import { initialiseFormResponse } from "../services/FormResponse";

function AddFormProject() {
    const [formTemplate, setformTemplate] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [rawData, setRawData] = useState();
    const [vendorData, setVendorData] = useState([]);
    const [selectedForms, setSelectedForms] = useState([]);
    const [projectData, setProjectData] = useState({});
    const [formResponses, setFormResponses] = useState([]);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const projectId = searchParams.get("projectId");
    const selectedVendorId = searchParams.get("selectedVendorId");

    useEffect(() => {
        async function fetchProjectAndVendor() {
            try {
                const project = await getProjectById(projectId);
                setProjectData(project);
                console.log("Project: ");
                console.log(project);
                const vendor = await getUserById(selectedVendorId);
                setVendorData(vendor);
                console.log("Vendor:");
                console.log(vendor);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchProjectAndVendor();
    }, []);

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const responses = await getFormResponsesByVendorIdAndProjectId(
                    selectedVendorId,
                    projectId
                );
                setFormResponses(responses);

                let forms = await getFormTemplateData();

                for (const response of responses) {
                    console.log(response.formTemplateId);
                    forms = forms.filter(
                        (form) =>
                            form.formTemplateId !== response.formTemplateId
                    );
                }

                console.log(forms);
                setRawData(forms);
                setformTemplate(forms);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchFormData();
    }, []);

    // For building filter logic
    function filterForms(event) {
        let newFilterValue = event.target.value;
        setFilterValue(newFilterValue);
        let filtered_forms = [];
        for (var form of rawData) {
            let slice = form.formName
                .toLowerCase()
                .slice(0, newFilterValue.length);
            if (slice == newFilterValue.toLowerCase()) {
                filtered_forms.push(form);
            }
        }
        setformTemplate(filtered_forms);
    }

    function handleProjectDataChange() { 
        
    }

    function handleFormTemplateSelectionChange(selectedForm) {
        let newSelectedForms = [];
        if (selectedForms.some((form) => form.id === selectedForm.id)) {
            newSelectedForms = selectedForms.filter(
                (form) => form.id !== selectedForm.id
            );
        } else {
            selectedForms.push(selectedForm);
            newSelectedForms = JSON.parse(JSON.stringify(selectedForms));
        }
        setSelectedForms(newSelectedForms);
    }

    async function handleSubmit() {
        let today = new Date().toJSON();
        for (const form of selectedForms) {
            const formResponseData = {
                formTemplateId: form.id,
                vendorId: selectedVendorId,
                projectId: projectId,
                status: "vendor",
                vendorDeadline: "2023-04-15T05:22:33.934+00:00",
                formAnswer: {},
                createdAt: today,
                updatedAt: today,
            };
            await initialiseFormResponse(formResponseData);
        }
        navigate(`/projectView?projectId=${projectId}`);
    }

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <div className="text-center my-5">
                <Typography
                    variant="h4"
                >
                    Select Additional Forms
                </Typography>
                <Typography variant='p'>These additional forms will be filled by the vendors that you have indicated</Typography>
            </div>

            {/* For container showing forms that are selected */}
            <Box display={'flex'} className='mb-5'>
                <Grid container>
                    <Grid item xs={6} md={3} marginY={'auto'}>
                        <Typography variant="h6" marginY={'auto'} width='300px'>Selected Form(s):</Typography>
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <Box borderColor={'primary'} marginY='auto' display={'flex'} sx={{ flexWrap: 'wrap' }}>
                            {selectedForms.map((item) => (
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
                    {selectedForms.map((item) => (
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
                                handleProjectDataChange={
                                    handleProjectDataChange
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
                                onChange={filterForms}
                                size='small'
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
                                {formTemplate.map((template) => (
                                    <EditProjectFormTemplateCard
                                        id={template.formTemplateId}
                                        name={template.formName}
                                        description={template.formDescription}
                                        selectedForms={selectedForms}
                                        // template={template}
                                        handleFormTemplateSelectionChange={
                                            handleFormTemplateSelectionChange
                                        }
                                    >
                                        {template}
                                    </EditProjectFormTemplateCard>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Box
                marginX="auto"
                marginTop={5}
            >
                <Button
                    onClick={handleSubmit}
                    variant='contained'
                    sx={{width:'100px'}}
                >
                    Submit
                </Button>
            </Box>
        </>
    );
}

export default AddFormProject;
