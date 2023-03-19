import { React , useEffect, useState } from 'react';

// import {
//     Chip, Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow
// } from "@material-ui/core";

import { Button, 
    Typography,
    Chip, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
  } from "@mui/material";

  import axios from "axios";

import { getUserByUsername, createProject } from '../../services/ProjectCreationPageAPI';
import { initialiseFormResponse } from '../../services/FormResponse';

const ProjectCreationPage3 = (props) => {

    const [vendors, setVendors] = useState([]);
    const [formIDs, setformIDs] = useState([]);
    

    const handleSubmit = async (e) => {
        // extract the project data from props
        let projectName = props.projectData.projectName;
        let vendorNamesArr = vendors;
        let projectDescription = props.projectData.projectDescription;
        let selectedFormsArr = props.projectData.selectedForm;
    
        console.log(props.projectData); // vendors state variable is accessible here

        // const data = {
            
        //     "projectName" : projectName,
        //     "projectDescription" : projectDescription,
        //     "vendorId" : ven
        // }

        let vid = []
        for(let vendor of vendorNamesArr){
            vid.push(vendor.id)
        }
        const data = {
            "projectName" : projectName,
            "projectDescription" : projectDescription,
            "vendorId" : vid
        }
        try {
            const createdProject = await createProject(data);
            console.log('Project created successfully:', createdProject);
            // console.log('Project ID:', createdProject._id);
            const projectID = createProject.projectID

           
            const formResponsePromises = selectedFormsArr.map(async (form) => {
                let formID = form.id;
                return vid.map(async (vendorID) => {
                  const formResponseData = {
                    formTemplateId: formID,
                    vendorId: vendorID,
                    projectId: projectID,
                  };
                  await initialiseFormResponse(formResponseData);
                });
              });
              
              await Promise.all(formResponsePromises.flat());
              


        } catch (error) {
            console.error('Failed to create project:', error);
        }



      };
    
      useEffect(() => {
        const vendorNamesArr = props.projectData.vendorCompanyName;
        const fetchData = async () => {
        const newVendor = await Promise.all(vendorNamesArr.map((ele) => getUserByUsername(ele)));
        setVendors(newVendor);
        };
        fetchData();
      }, [props.projectData.vendorCompanyName]);
    
      const selectedFormsArr = props.projectData.selectedForm;
    //   formResponseObjArr = selectedFormsArr.map( (ele) => {} )


  return (
    <>
    <Typography variant="h3" component="div" style={{ flexGrow: 1, margin: 30 }}>
        View Summary
    </Typography>
    <br></br>
    <br></br>
    <br></br>

    <TableContainer style={{ maxHeight: 800, backgroundColor:'#edeae1' }}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align='center' colSpan={2} style={{fontSize:'25px', fontWeight:'bold'}}>Summary</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell align='center' style={{fontSize:'15px', fontWeight:'bold'}}>Project Name</TableCell>
                    <TableCell align='center'>{props.projectData.projectName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align='center' style={{fontSize:'15px', fontWeight:'bold'}}>Vendor Company Name</TableCell>
                    <TableCell align='center'>{props.projectData.vendorCompanyName.map((item) => (
                            <Chip label={item} />
                        ))}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align='center' style={{fontSize:'15px', fontWeight:'bold'}}>Project Description</TableCell>
                    <TableCell align='center'>{props.projectData.projectDescription}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align='center' style={{fontSize:'15px', fontWeight:'bold'}}>Selected forms to fill</TableCell>
                    <TableCell align='center'>
                        {props.projectData.selectedForm.map((item) => (
                            <Chip label={item.name} />
                        ))}
                    </TableCell>
                </TableRow>

            </TableBody>
        </Table>
    </TableContainer>


    <Button onClick={() => props.setActivePage('2')} style={{ backgroundColor: '#a8c7f7', color: 'inherit', height:50, width:150, margin: 100 }} >Back</Button>

    <Button type='submit' onClick={handleSubmit} style={{ backgroundColor: '#a8c7f7', color: 'inherit',  height:50, width:150, margin: 100 }} >Submit</Button>

    </>

  )
}

export default ProjectCreationPage3