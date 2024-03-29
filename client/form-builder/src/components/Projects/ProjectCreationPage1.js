import { React, useState, useEffect } from "react";
import {
    Button,
    TextField,
    Typography,
    Autocomplete,
    Chip,
    Grid
} from "@mui/material";
import "./ProjectCreationPage.css";
// import axios from 'axios';
import axios from "axios";
import { getVendorData } from "../../services/ProjectCreationPageAPI";
// import SelectButton from "./SelectButton";

const ProjectCreationPage1 = (props) => {
    const { handleProjectDataChange, projectData } = props;

    const handleProjectNameChange = (e) => {
        handleProjectDataChange("projectName", e.target.value);
    };

    // const handleVendorCompanyNameChange = (e) => {
    //   handleProjectDataChange('vendorCompanyName', e.target.value);
    // }
    const handleVendorCompanyNameChange = (value) => {
        handleProjectDataChange("vendorCompanyName", value.username);
    };

    const handleProjectDescriptionChange = (e) => {
        handleProjectDataChange("projectDescription", e.target.value);
    };

    const handleDateChange = (e) => { 
        console.log(e.target.value)
        console.log(projectData)
        handleProjectDataChange('dueDate', e.target.value)
    }

    const [vendorData, setVendorData] = useState([]);
    // const apiUrl = 'http://localhost:8080/api/admin/allUsers';

    useEffect(() => {
        const fetchData = async () => {
            try {
                let vendor = await getVendorData();
                console.log(vendor);
                // console.log(vendorData)
                setVendorData(vendor);
                // console.log(vendorData);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, []);

    //logic for Next button
    //Ken Ming
    const [projectNameEntered, setProjectNameEntered] = useState(true);
    const [vendorCompanyNameEntered, setVendorCompanyNameEntered] =
        useState(true);
    const handleNextButtonClick = () => {
        if (projectData.projectName && projectData.vendorCompanyName) {
            props.setActivePage("2");
        } else {
            if (projectData.projectName == "") {
                setProjectNameEntered(false);
            } else {
                setProjectNameEntered(true);
            }
            if (
                projectData.vendorCompanyName == "" ||
                projectData.vendorCompanyName == null
            ) {
                setVendorCompanyNameEntered(false);
            } else {
                setVendorCompanyNameEntered(true);
            }
        }
    };

    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            {console.log(vendorData)}
            {console.log(projectData)}
            <div className="text-center my-5">
                <Typography
                    variant="h4"
                >
                    Create a new project
                </Typography>
                <Typography variant='p'>Fill in the preliminary details of this form</Typography>
            </div>

            <Grid container spacing={3} sx={{marginBottom:5}}>
                <Grid item xs={4}>
                    <TextField
                        id="ProjectName"
                        label="Project Name"
                        style={{ marginRight: 20, width: "300px" }}
                        onChange={handleProjectNameChange}
                        value={projectData.projectName}
                        fullWidth
                    />
                </Grid>
                {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={vendorData}
            getOptionLabel={(option) => option.username}
            style={{margin: 20, width: '300px' }}
            onChange={(event, value) => handleVendorCompanyNameChange(value)}
            value={
              vendorData.find((option) => option.username === projectData.vendorCompanyName) || null
            }
            renderInput={(params) => (
              // <TextField
              //   {...params}
              //   id="VendorCompanyName"
              //   label="Vendor Company Name"
              //   value={projectData.vendorCompanyName}
              //   onChange={handleVendorCompanyNameChange}
              // />
              
              

            )}
            
          /> */}
                <Grid item xs={4}>
                    <Autocomplete
                        multiple
                        fullWidth
                        id="vendor-company-name"
                        options={vendorData}
                        getOptionLabel={(option) => option.name}
                        value={vendorData.filter((option) =>
                            projectData.vendorCompanyName.includes(option.username)
                        )}
                        onChange={(event, newValue) => {
                            handleProjectDataChange(
                                "vendorCompanyName",
                                newValue.map((option) => option.username)
                            );
                        }}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    variant="outlined"
                                    label={option.name}
                                    key={option.username}
                                    {...getTagProps({ index })}
                                    style={{
                                        display: "inline-flex",
                                        margin: "2px",
                                    }}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Vendor Name"
                                placeholder="Select vendor companies"
                                value={
                                    projectData.vendorCompanyName.length > 0
                                        ? ""
                                        : params.inputProps.value
                                }
                                onChange={params.onChange}
                                style={{ width: 300 }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        id="dueDate" 
                        label="Vendor Due Date" 
                        name="dueDate" 
                        value={projectData.dueDate} 
                        type='date' 
                        fullWidth 
                        onChange={(event) => handleDateChange(event)}
                    ></TextField>
                </Grid>
            </Grid>

            <TextField
                id="ProjectDescription"
                label="Project Description"
                multiline={true}
                rows={10}
                fullWidth
                onChange={handleProjectDescriptionChange}
                value={projectData.projectDescription}
            />

            <br></br>
            <br></br>
            <br></br>

            <Button
                onClick={handleNextButtonClick}
                variant='contained'
                sx={{width:'100px'}}
            >
                Next
            </Button>

            {/* Ken Ming */}
            {!projectNameEntered && <h3>Please Enter Project Name</h3>}
            {!vendorCompanyNameEntered && <h3>Please Enter Vendor Name</h3>}
        </div>
    );
};

export default ProjectCreationPage1;
