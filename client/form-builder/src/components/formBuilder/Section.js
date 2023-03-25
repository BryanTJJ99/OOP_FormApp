import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, TextField, Select, MenuItem, Typography, FormControl } from '@mui/material';
import { borderRadius } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete'

//TO DO add delete function for section
const Section = (props) => {
    const [sectionTitle, setSectionTitle] = useState("");
    const [assignedTo, setAssignedTo] = useState('vendor'); 

    function handleChangeAssignedTo(value) {
        setAssignedTo(value);
    }

    useEffect(() => { 
        props.handleSectionInputChange('Section' + props.sectionNum, sectionTitle, assignedTo)
        console.log(sectionTitle)
    }, [sectionTitle, assignedTo])

    return (

        <Box id={'Section' + props.sectionNum} className='mb-2 mt-4 pb-3' bgcolor='primary.main' borderRadius={1}>

            <Box className="me-0 d-flex justify-content-between align-items-center pe-3" sx={{ borderRadius: '8px', display: 'flex',height:'60px'}}>
                <div className='d-flex w-75'> 
                    <TextField id={'Section' + props.sectionNum + 'sectionName'} value={sectionTitle} name={'Section' + props.sectionNum + 'sectionName'} variant='standard' className=" bg-transparent text-white ms-3 my-auto" placeholder={`Section ${props.sectionNum} Title`} onChange={(event) => setSectionTitle(event.target.value)} fullWidth required></TextField>
                </div>
                <IconButton color='error' sx={{my:'auto'}} onClick={() => props.handleDeleteSection('Section' + props.sectionNum)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
            <Box display='flex'>
                <Typography component='label' marginRight={3} marginLeft={2} marginY='auto' color='white'>Assign to:</Typography>
                <FormControl sx={{textAlign:"start"}}>
                    <Select id={'Section' + props.sectionNum + 'assignedTo'} name={'Section' + props.sectionNum + 'assignedTo'} sx={{ height: '50px', width: 200, ms: '3' }} value={assignedTo} onChange={(event) => handleChangeAssignedTo(event.target.value)}>
                        <MenuItem value="vendor">Vendor</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="approver">Approver</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>


    )
}

export default Section;