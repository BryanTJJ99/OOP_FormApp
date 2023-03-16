import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { borderRadius } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete'

//TO DO add delete function for section
const Section = (props) => {
    const [sectionTitle, setSectionTitle] = useState(`Section ${props.sectionNum} Title`);

    return (

        <div id={'Section' + props.sectionNum} className='mb-2 mt-4'>

            <Box className="me-0 d-flex justify-content-between align-items-center pe-3" sx={{ borderRadius: '8px', display: 'flex', bgcolor: 'primary.main',height:'60px'}}>
                <div className='d-flex w-75'> 
                    <TextField variant='standard' className=" bg-transparent text-white ms-3 my-auto" placeholder={sectionTitle} onChange={(event) => setSectionTitle(event.target.value)} fullWidth></TextField>
                </div>
                <IconButton color='error' sx={{my:'auto'}} onClick={() => props.handleDeleteSection('Section' + props.sectionNum)}>
                    <DeleteIcon />
                </IconButton>

            </Box>
        </div>


    )
}

export default Section;