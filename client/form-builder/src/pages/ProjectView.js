import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
    getFormResponsesByVendorIdAndProjectId,
    getProjectById,
    updateProject,
} from "../services/ProjectViewAPI.js";
import { Link } from "react-router-dom";

import {
    Box,
    Grid,
    TableCell,
    Table,
    Paper,
    colors,
    TextField,
    ModeEditIcon,
    InputAdornment,
    IconButton,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    DialogActions
} from "@mui/material";
import { CheckBox, Edit as EditIcon, SaveAs as SaveAsIcon } from "@mui/icons-material";
import { getUserById } from "../services/User.js";
import { DataGrid } from "@mui/x-data-grid";
import { getFormTemplateById } from "../services/FormTemplate.js";
import FormPills from "../components/FormIndex/FormPills.js";

function SimpleDialog(props) {
    const {
        selectedVendor,
        setSelectedVendor,
        open,
        onClose,
        vendors,
        project,
    } = props;

    const handleClose = () => {
        onClose(selectedVendor);
    };
    const handleListItemClick = (vendor) => {
        setSelectedVendor(vendor);
    };
    // // const queryString = window.location.search;
    // // const urlParams = new URLSearchParams(queryString);
    // // const projectId = urlParams.get("projectId");
    console.log(project);
    const selectedVendorId = selectedVendor.id;

    let projectId = "";
    for (const key in project) {
        if (key === "projectID") {
            projectId = project["projectID"];
            console.log(projectId);
            console.log(project["projectID"]);
        }
    }
    console.log(projectId);

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Select vendor to add form</DialogTitle>
            <FormControl sx={{marginX:3}}>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={selectedVendor}
                    required
                >   
                    {vendors.map((vendor) => {
                        return <FormControlLabel value={vendor} control={<Radio value={vendor} required/>} label={vendor.name} onClick={handleListItemClick(vendor)} />
                    })}
                </RadioGroup>
            </FormControl>
            <DialogActions>
                <Button
                    float='right'
                    marginBottom={2}
                    href={'/AddFormProject?projectId=' + projectId + '&selectedVendorId=' + selectedVendorId}
                >
                    Add form
                </Button>
            </DialogActions>
            {/* <List sx={{ pt: 0 }}>
                {vendors.map((vendor) => (
                    <ListItem disableGutters sx={{ display: "block" }}>
                        <ListItemButton
                            onClick={() => handleListItemClick(vendor)}
                            key={vendor.name}
                            sx={
                                selectedVendor.name == vendor.name
                                    ? { backgroundColor: "grey.light" }
                                    : null
                            }
                        >   
                            <ListItemText
                                primary={vendor.name}
                                sx={{ textAlign: "center" }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Button
                    component={Link}
                    to={{
                        pathname: "/AddFormProject",
                        search:
                            "?projectId=" +
                            projectId +
                            "&selectedVendorId=" +
                            selectedVendorId,
                    }}
                >
                    {console.log(projectId)}
                    Add form
                </Button>
            </List> */}
        </Dialog>
    );
}

// SimpleDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.string.isRequired,
// };

const ProjectView = () => {
    const [project, setProject] = useState(null);
    const [editProjectName, setEditProjectName] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [editProjectDescription, setEditProjectDescription] = useState(false);
    const [projectDescription, setProjectDescription] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState({});
    const [vendorIds, setVendorIds] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        (async () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const projectId = urlParams.get("projectId");
            console.log(projectId);
            // async function getAllDataForProjectView() {
            let foundProject = await getProjectById(projectId);

            setProject(foundProject);
            setProjectName(foundProject.projectName);
            setProjectDescription(foundProject.projectDescription);
            setVendorIds(foundProject.vendorId);

            const vendors = await Promise.all(
                foundProject.vendorId.map((vendorId) => getUserById(vendorId))
            );
            setVendors(vendors);

            // console.log(vendors);
            const newRows = await Promise.allSettled(
                vendors.map(async (vendor) => {
                    let vendorForms =
                        await getFormResponsesByVendorIdAndProjectId(
                            vendor.id,
                            foundProject.projectID
                        );

                    let newVendorForms = [];
                    for (const vendorForm of vendorForms) {
                        let foundTemplate = await getFormTemplateById(
                            vendorForm.formTemplateId
                        );
                        vendorForm["name"] = foundTemplate.formName;
                        vendorForm["id"] = vendorForm.formResponseId;
                        vendorForm[
                            "link"
                        ] = `/FormResponse?formResponseId=${vendorForm.formResponseId}`;
                        newVendorForms.push(vendorForm);
                    }

                    return {
                        id: vendor.id,
                        vendor: vendor.name,
                        forms: newVendorForms,
                    };
                })
            );

            let rowsToAdd = [];
            for (const newRow of newRows) {
                rowsToAdd.push(newRow.value);
            }

            setRows(rowsToAdd);
            console.log("returning");
            return;
        })();
    }, []);

    const handleDialogOpen = () => {
        setOpenDialog(true);
        console.log(project.vendorId);
    };

    const handleDialogClose = (value) => {
        setOpenDialog(false);
        setSelectedVendor(value);
    };

    // console.log(project.projectName)

    // const handleTextChange = (event, index) => {
    //   const  value  = event.target;
    //   setProjectName(prevData => {
    //     const newData = [...prevData];
    //     newData[index] = value;
    //     return newData;
    //   });
    // };

    const columns = [
        { field: "vendor", headerName: "Vendor", width: 200 },
        // {
        //     field: "FormResponses",
        //     headerName: "Forms",
        //     width: 150,
        //     editable: true,
        // },
        {
            field: "forms",
            headerName: "Forms",
            renderCell: (params) => {
                return <FormPills forms={params} />;
            },
            editable: false,
            flex: 5,
        },
    ];

    return (
        <>  
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <Box className="text-center my-5" justifyContent={'center'}>
                <Box textAlign={'center'}>
                    <Typography variant='h4' textAlign={'center'}>Edit Project</Typography>
                    <Typography variant='p' textAlign={'center'}>Update any information about a specific project</Typography>
                </Box>
            </Box>

            <Box>
                <Button component={Link} variant='contained' to="/Project" sx={{float:'left'}} className='mb-5'>
                    Back to All Projects
                </Button>
                <Button variant="contained" onClick={handleDialogOpen} sx={{float:'right'}}>
                    Add Forms
                </Button>
            </Box>
            
            <Grid container>
                <Grid item xs={6} marginBottom={2}>
                    <TextField
                        fullWidth
                        label="Project Name"
                        value={projectName}
                        onChange={(e) => {
                            setProjectName(e.target.value);
                        }}
                        disabled={!editProjectName}
                        //   size="large"
                        //   sx={{fontSize: "5rem", height: "50%", width: "50%"}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {editProjectName ? (
                                        <IconButton
                                            aria-label="save project name"
                                            onClick={() => {
                                                setEditProjectName(!editProjectName);
                                                project.projectName = projectName;
                                                setProject(project);
                                                updateProject(project);
                                            }}
                                        >
                                            <SaveAsIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            aria-label="edit project name"
                                            onClick={() =>
                                                setEditProjectName(!editProjectName)
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} marginBottom={2}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label='Project Description'
                        value={projectDescription}
                        onChange={(e) => {
                            setProjectDescription(e.target.value);
                        }}
                        disabled={!editProjectDescription}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {editProjectDescription ? (
                                        <IconButton
                                            aria-label="save project description"
                                            onClick={() => {
                                                setEditProjectDescription(
                                                    !editProjectDescription
                                                );
                                                project.projectDescription =
                                                    projectDescription;
                                                setProjectDescription(
                                                    project.projectDescription
                                                );
                                                updateProject(project);
                                            }}
                                        >
                                            <SaveAsIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            aria-label="edit project description"
                                            onClick={() =>
                                                setEditProjectDescription(
                                                    !editProjectDescription
                                                )
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
            
            {console.log(project)}

            
            {console.log(project)}
            <SimpleDialog
                selectedVendor={selectedVendor}
                setSelectedVendor={setSelectedVendor}
                open={openDialog}
                onClose={handleDialogClose}
                vendors={vendors}
                project={project}
            />

            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                sx={{
                    '& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaderTitle': {
                    backgroundColor: "primary.main",
                    color:"white",
                    fontWeight: 'bold',
                    },
                }}
            />
        </>
    );
};

export default ProjectView;
