import React from 'react';
import {
    Button,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip
  } from "@mui/material";

  import axios from "axios";


const ProjectCreationPage3 = (props) => {

    const handleSubmit = (e) => {
        // e.preventDefault();
        // Handle form submission logic here

        // //to do URL
        // url = "/project";
        // axios.post(url,{

        // })
        // .then(response=>{

        // })
        // .catch(error=>{

        // });
        
    
    };
    

  return (
    <>
    <div>ProjectCreationPage3</div>
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
                    <TableCell align='center'>{props.projectName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align='center' style={{fontSize:'15px', fontWeight:'bold'}}>Vendor Company Name</TableCell>
                    <TableCell align='center'>{props.vendorCompanyName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align='center' style={{fontSize:'15px', fontWeight:'bold'}}>Project Description</TableCell>
                    <TableCell align='center'>{props.projectDescription}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align='center' style={{fontSize:'15px', fontWeight:'bold'}}>Selected forms to fill</TableCell>
                    <TableCell align='center'>
                        {props.selectedForm.map((item) => (
                            <Chip label={item.name} />
                        ))}
                    </TableCell>
                </TableRow>

            </TableBody>
        </Table>
    </TableContainer>


    <Button onClick={() => props.setActivePage('2')} style={{ backgroundColor: '#a8c7f7', height:50, width:150, margin: 100 }} >Back</Button>

    <Button type='submit' onClick={handleSubmit} style={{ backgroundColor: '#a8c7f7', color: 'inherit',  height:50, width:150, margin: 100 }} >Submit</Button>

    </>

  )
}

export default ProjectCreationPage3