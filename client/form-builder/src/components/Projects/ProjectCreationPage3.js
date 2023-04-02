import { React, useEffect, useState } from "react";

// import {
//     Chip, Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow
// } from "@material-ui/core";

import {
    Button,
    Typography,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Link,
    Box,
} from "@mui/material";

import axios from "axios";

import {
    getUserByUsername,
    createProject,
} from "../../services/ProjectCreationPageAPI";
import { createFormResponse } from "../../services/FormResponse";

const ProjectCreationPage3 = (props) => {
    const [vendors, setVendors] = useState([]);
    const [formIDs, setformIDs] = useState([]);

    const handleSubmit = async (e) => {
        // extract the project data from props
        let projectName = props.projectData.projectName;
        let vendorNamesArr = vendors;
        let dueDate = props.projectData.dueDate; 
        let projectDescription = props.projectData.projectDescription;
        let selectedFormsArr = props.projectData.selectedForm;

        console.log(props.projectData); // vendors state variable is accessible here

        // const data = {

        //     "projectName" : projectName,
        //     "projectDescription" : projectDescription,
        //     "vendorId" : ven
        // }

        let vid = [];
        for (let vendor of vendorNamesArr) {
            vid.push(vendor.id);
        }
        const data = {
            projectName: projectName,
            projectDescription: projectDescription,
            vendorId: vid,
        };
        try {
            createProject(data).then((response) => {
                const createdProject = response;
                console.log("Project created successfully:", createdProject);
                const projectID = createdProject.projectID;
                console.log(createdProject, projectID);
                const formResponsePromises = selectedFormsArr.map(
                    async (form) => {
                        let formID = form.id;
                        let today = new Date().toJSON();
                        return vid.map(async (vendorID) => {

                          const formResponseData = {
                            formTemplateId: formID,
                            vendorId: vendorID,
                            projectId: projectID,
                            status: 'vendor',
                            vendorDeadline: dueDate,
                            formAnswer: {}, 
                            versionHistory: {}, 
                            createdAt: today,
                            updatedAt: today,
                          };
                          console.log(formResponseData)
                          createFormResponse(formResponseData)
                            .then(response => { 
                                console.log(response)
                            })
                            .catch(error => { 
                                console.log(error.message);
                            })
                        });
                    }
                );
                window.location.href = "/Project";

                Promise.all(formResponsePromises.flat());
            });
            // const createdProject = await createProject(data);
            // console.log('Project created successfully:', createdProject);
            // // console.log('Project ID:', createdProject._id);
            // const projectID = createProject.projectID

            // const formResponsePromises = selectedFormsArr.map(async (form) => {
            //     let formID = form.id;
            //     let today = new Date().toJSON();
            //     return vid.map(async (vendorID) => {
            //       const formResponseData = {
            //         formTemplateId: formID,
            //         vendorId: vendorID,
            //         projectId: projectID,
            //         reviewedBy: "6411538f436af646394c3fe4",
            //         approvedBy: "6409dc0be3139a5d267579b2",
            //         status: 'vendor',
            //         vendorDeadline: '2023-04-15T05:22:33.934+00:00',
            //         createdAt: today,
            //         updatedAt: today,
            //       };
            //       await initialiseFormResponse(formResponseData);
            //     });
            //   });

            //   await Promise.all(formResponsePromises.flat());
        } catch (error) {
            console.error("Failed to create project:", error);
        }
    };

    useEffect(() => {
        const vendorNamesArr = props.projectData.vendorCompanyName;
        const fetchData = async () => {
            const newVendor = await Promise.all(
                vendorNamesArr.map((ele) => getUserByUsername(ele))
            );
            setVendors(newVendor);
        };
        fetchData();
    }, [props.projectData.vendorCompanyName]);

    const selectedFormsArr = props.projectData.selectedForm;
    //   formResponseObjArr = selectedFormsArr.map( (ele) => {} )

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <div className="text-center my-5">
                <Typography
                    variant="h4"
                >
                    Summary
                </Typography>
                <Typography variant='p'>Please check your inputs before we create this project</Typography>
            </div>

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
                            <TableCell align="center">
                                Field
                            </TableCell>
                            <TableCell align="center">
                                Your Inputs
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" fontWeight='bold' width='500px'>
                                <Box variant='span' fontWeight={'bold'}>Project Name:</Box>
                            </TableCell>
                            <TableCell align="center">
                                {props.projectData.projectName}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" fontWeight='bold'>
                                <Box variant='span' fontWeight={'bold'}>Vendor Name(s):</Box>
                            </TableCell>
                            <TableCell align="center">
                                {vendors.map((vendor) => {
                                    return (
                                        <Chip
                                            label={vendor.name}
                                            key={vendor.name}
                                        />
                                    );
                                })}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">
                                <Box variant='span' fontWeight={'bold'}>Project Description:</Box>
                            </TableCell>
                            <TableCell align="center">
                                {props.projectData.projectDescription}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">
                                <Box variant='span' fontWeight={'bold'}>Selected forms to fill:</Box>
                            </TableCell>
                            <TableCell align="center">
                                {props.projectData.selectedForm.map((item) => (
                                    <Chip label={item.name} key={item.name} sx={{backgroundColor:'primary.main', color:'white', marginX:2, marginBottom:1}}/>
                                ))}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                display="flex"
                width="300px;"
                marginX="auto"
                marginY="50px"
                justifyContent="space-between"
            >
                <Button
                    onClick={() => props.setActivePage("2")}
                    variant='contained'
                    sx={{width:'100px'}}
                >
                    Back
                </Button>

                <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant='contained'
                    sx={{width:'100px'}}
                >
                    Submit
                </Button>
            </Box>
        </>
    );
};

//   return (
//     <>
//     <Typography variant="h3" component="div" style={{ flexGrow: 1, margin: 30 }}>
//         View Summary
//     </Typography>
//     <br></br>
//     <br></br>
//     <br></br>

//     <TableContainer style={{ width:"100%",  }}>
//         <Table sx={{p:3,width:"70%", backgroundColor:'#edeae1',mx:"auto",borderRadius:"15px",}}>
//             <TableHead >
//                 <TableRow>
//                     <TableCell align='center' colSpan={2} style={{fontSize:'25px', fontWeight:'bold'}}>Summary</TableCell>
//                 </TableRow>
//             </TableHead>
//             <TableBody>
//                 <TableRow>
//                     <TableCell align='center' style={{fontSize:'15px',width:"400px", fontWeight:'bold'}}>Project Name:</TableCell>
//                     <TableCell align='center'>{props.projectData.projectName}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                     <TableCell align='center' style={{fontSize:'15px', fontWeight:'bold'}}>Vendor Name(s):</TableCell>
//                     <TableCell align='center'>{props.projectData.vendorCompanyName.map((item) => (
//                             <Chip label={item} />
//                         ))}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                     <TableCell align='center' style={{fontSize:'15px', fontWeight:'bold'}}>Project Description:</TableCell>
//                     <TableCell align='center'>{props.projectData.projectDescription}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                     <TableCell align='center' style={{fontSize:'15px', fontWeight:'bold'}}>Selected forms to fill:</TableCell>
//                     <TableCell align='center'>
//                         {props.projectData.selectedForm.map((item) => (
//                             <Chip label={item.name} />
//                         ))}
//                     </TableCell>
//                 </TableRow>

//             </TableBody>
//         </Table>
//     </TableContainer>

//     <Box display="flex" width="300px;" marginX="auto" marginY="50px" justifyContent="space-between">
//         <Button onClick={() => props.setActivePage('2')} style={{ backgroundColor: '#1F87BC',color:"white", height:50, width:100, }} >Back</Button>

//         <Button type='submit' onClick={handleSubmit} style={{ backgroundColor: '#1F87BC',color:"white", height:50, width:100, }} >Submit</Button>
//     </Box>
//     </>

//   )
// }

export default ProjectCreationPage3;
