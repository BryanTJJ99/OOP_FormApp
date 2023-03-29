import { React, useEffect, useState } from "react";
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
} from "@mui/material";
import { Edit as EditIcon, SaveAs as SaveAsIcon } from "@mui/icons-material";
import { getUserById } from "../services/User.js";
import { DataGrid } from "@mui/x-data-grid";
import { getFormTemplateById } from "../services/FormTemplate.js";
import FormPills from "../components/FormIndex/FormPills.js";

function SimpleDialog(props) {
    const { onClose, selectedValue, open, vendors } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <List sx={{ pt: 0 }}>
                {vendors.map((vendor) => (
                    <ListItem disableGutters>
                        <ListItemButton
                            onClick={() => handleListItemClick(vendor)}
                            key={vendor}
                        >
                            <ListItemText primary={vendor} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

//   SimpleDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.string.isRequired,
//   };

const ProjectView = () => {
    const [project, setProject] = useState(null);
    const [editProjectName, setEditProjectName] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [editProjectDescription, setEditProjectDescription] = useState(false);
    const [projectDescription, setProjectDescription] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState("");
    const [vendorIds, setVendorIds] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        // const queryString = window.location.search;
        // const urlParams = new URLSearchParams(queryString);
        // const projectId = urlParams.get('projectId')
        async function getAllDataForProjectView() {
            let foundProject = await getProjectById("64232a433e2ea00149171965");

            setProject(foundProject);
            setProjectName(foundProject.projectName);
            setProjectDescription(foundProject.projectDescription);
            setVendorIds(foundProject.vendorId);

            for (const vendorId of foundProject.vendorId) {
                let vendorResponse = await getUserById(vendorId);
                vendors.push(vendorResponse);
                setVendors(vendors);
            }

            console.log(vendors);
            const newRows = await Promise.allSettled(
                vendors.map(async (vendor) => {
                    let vendorForms =
                        await getFormResponsesByVendorIdAndProjectId(
                            vendor.id,
                            foundProject.projectID
                        );
                    // let formTemplateNames = await Promise.all(
                    //     vendorForms.map(async (vendorForm) => {
                    // let foundTemplate = await getFormTemplateById(
                    //     vendorForm.formTemplateId
                    // );
                    // return foundTemplate.formName;
                    //     })
                    // );
                    // console.log(formTemplateNames);

                    let newVendorForms = [];
                    for (const vendorForm of vendorForms) {
                        let foundTemplate = await getFormTemplateById(
                            vendorForm.formTemplateId
                        );
                        vendorForm["name"] = foundTemplate.formName;
                        vendorForm["id"] = vendorForm.formResponseId;
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

            console.log(rowsToAdd);
            setRows(rowsToAdd);
        }
        getAllDataForProjectView();
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
            {/* <Typography variant="h1" component="h1"> */}
            <Button component={Link} to="/Project">
                Back to Project Index
            </Button>
            <TextField
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
            {/* </Typography> */}

            <TextField
                multiline
                maxRows={5}
                value={projectDescription}
                onChange={(e) => {
                    setProjectDescription(e.target.value);
                }}
                disabled={!editProjectDescription}
                sx={{ width: "90%" }}
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

            {/* <Button variant="outlined" onClick={handleDialogOpen}>
                Open simple dialog
            </Button>
            <SimpleDialog
                selectedValue={selectedVendor}
                open={openDialog}
                onClose={handleDialogClose}
                vendors={vendors}
            />

            <Link
                to={{
                    pathname: "../components/Projects/ProjectCreationPage2",
                    state: { projectName, projectDescription },
                }}
                // vendor obj is stored in the vendors state
            >
                <Button variant="contained">Add Form</Button>
            </Link> */}

            {/* {console.log(project)} */}

            <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
            />
        </>
    );
};

export default ProjectView;
