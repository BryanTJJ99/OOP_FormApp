import Counter from "../components/ClientProject/Counter";
import PendingForms from "../components/ClientProject/PendingForms";
import ClientFormTable from "../components/ClientProject/ClientFormTable";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoopIcon from "@mui/icons-material/Loop";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { useState, useEffect } from "react";
import { getAllProjects } from "../services/DashboardAPI";
import { getAllFormResponses } from "../services/FormResponse";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ArchiveIcon from "@mui/icons-material/Archive";
import { getCurrentUser } from "../services/AuthService.js";

const CompletedProjectsWidget = (props) => {
    // defining state variables
    const [totalCompletedProjects, setTotalCompletedProjects] = useState(0);
    // const [vendorId, setVendorId] = useState(getCurrentUser().id)
    // const [vendorId, setVendorId] = useState("6409dc37e3139a5d267579b3");
    // const [totalProjectsByVendorId, setTotalProjectsByVendorId] = useState(0);
    // const [vendorProjects, setVendorProjects] = useState([]);
    // const [vendorForms, setVendorForms] = useState([]);

    // to be dynamic getallFormResponses
    const vendorId = props.vendorId;

    useEffect(() => {
        console.log(vendorId)
        // getFormReponseByVendorId(vendorId) 
        //     .then(response => { 
        //         for (let formRes of response) { 
        //             vendorForms.push(formRes); 
        //         }
        //         let currProjs = 0;
        //         for (let formRes of vendorForms) { 
        //             if (formRes.status !== 'approved') { 
        //                 currProjs++ 
        //                 break 
        //             }
        //         }
        //     })
        //     .catch(error => { 
        //         console.log(error.message); 
        //     })
        getAllProjects()
            .then((response) => {
                let vendorProjects = [];
                //get vendor projects
                for (let project of response) {
                    if (project.vendorId.includes(vendorId)) {
                        vendorProjects.push(project);
                    }
                }
                getAllFormResponses().then((response2) => {
                    let vendorForms = [];
                    //get vendor forms
                    for (let FormResponse of response2) {
                        if (FormResponse.vendorId == vendorId) {
                            vendorForms.push(FormResponse);
                        }
                    }
                    let currProjs = 0;
                    //count completed projects
                    for (let project of vendorProjects) {
                        for (let FormResponse of vendorForms) {
                            if (project.projectID == FormResponse.projectId) {
                                console.log(FormResponse.status);
                                if (FormResponse.status != "approved") {
                                    currProjs++;
                                    break;
                                }
                            }
                        }
                    }

                    setTotalCompletedProjects(
                        vendorProjects.length - currProjs
                    );
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <Box sx={{ height: 300, padding: 5 }} variant="outlined">
            <Typography variant="h4">Completed Projects</Typography>
            <ArchiveIcon
                sx={{ height: 150, width: 150, mx: 1, color: "#63676e" }}
            />
            <span style={{ fontSize: "24px" }}>{totalCompletedProjects}</span>
        </Box>
    );
};

const CurrentProjectsWidget = (props) => {
    //done

    // defining state variables
    const [currentProjects, setCurrentProjects] = useState(0);
    // const [AllProjectsData, setAllProjectsData] = useState(null);
    // const [vendorId, setVendorId] = useState(getCurrentUser().id)
    // const [vendorId, setVendorId] = useState("6409dc37e3139a5d267579b3");
    // to be dynamic getallFormResponses
    const vendorId = props.vendorId;

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        getAllProjects()
            .then((response) => {
                let vendorProjects = [];
                //get vendor projects
                for (let project of response) {
                    if (project.vendorId.includes(vendorId)) {
                        vendorProjects.push(project);
                    }
                }
                getAllFormResponses().then((response2) => {
                    let vendorForms = [];
                    //get vendor forms
                    for (let FormResponse of response2) {
                        if (FormResponse.vendorId == vendorId) {
                            vendorForms.push(FormResponse);
                        }
                    }
                    let currProjs = 0;
                    //count uncompleted projects
                    for (let project of vendorProjects) {
                        for (let FormResponse of vendorForms) {
                            if (project.projectID == FormResponse.projectId) {
                                if (FormResponse.status != "approved") {
                                    currProjs++;
                                    break;
                                }
                            }
                        }
                    }

                    setCurrentProjects(currProjs);
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <Box sx={{ height: 300, padding: 5 }} variant="outlined">
            <Typography variant="h4">Current Projects</Typography>
            <CheckCircleIcon
                sx={{ height: 150, width: 150, mx: 1, color: "#63676e" }}
            />
            <span style={{ fontSize: "24px" }}>{currentProjects}</span>
        </Box>
    );
};

const PendingFormsWidget = (props) => {
    // defining state variables
    const [pendingForms, setPendingForms] = useState(0);
    // const [vendorId, setVendorId] = useState(getCurrentUser().id)
    // const [vendorId, setVendorId] = useState("6409dc37e3139a5d267579b3");
    const [allFormResponses, setAllFormResponses] = useState(null);
    // to be dynamic getallFormResponses
    const vendorId = props.vendorId;

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        getAllFormResponses()
            .then((response) => {
                setAllFormResponses(response);

                let pendingForms = [];
                for (var FormResponse of response) {
                    console.log(FormResponse, "here");
                    if (
                        FormResponse.vendorId == vendorId &&
                        FormResponse.status != "approved"
                    ) {
                        pendingForms.push(FormResponse);
                    }
                }
                setPendingForms(pendingForms.length);
            })
            .catch((error) => {
                console.log(error.message);
            });

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <Box sx={{ height: 300, padding: 5 }} variant="outlined">
            <Typography variant="h4">Pending Forms</Typography>
            <FolderCopyIcon
                sx={{ height: 150, width: 150, mx: 1, color: "#63676e" }}
            />
            <span style={{ fontSize: "24px" }}>{pendingForms}</span>
        </Box>
    );
};

const ClientProject = () => {
    // to getAllFormResponses using findAll() in FormResponseRepository

    const [vendorId, setVendorId] = useState(getCurrentUser().id);

    //styling
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: 2, my: 1 }}>
                <Grid container spacing={2} style={{ height: "100%" }}>
                    <Grid item xs={4}>
                        <Item>
                            <CompletedProjectsWidget vendorId={vendorId} />
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <CurrentProjectsWidget vendorId={vendorId} />
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <PendingFormsWidget vendorId={vendorId} />
                        </Item>
                    </Grid>
                    <Box sx={{ m: 2, width: 1 }}>
                        <ClientFormTable vendorId={vendorId} />
                    </Box>
                </Grid>
            </Box>
        </>
    );
};

export default ClientProject;
