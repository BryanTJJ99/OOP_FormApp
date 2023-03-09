import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { borderRadius } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete'
//TO DO add delete function for section
const Section = (props) => {
    const [sectionTitle, setSectionTitle] = useState(`Section ${props.sectionNum} Title`);

    return (

        <div id={'Section' + props.sectionNum} className='mb-2 mt-4 d-flex'>

            <Box className="me-0 " sx={{ borderRadius: '8px', display: 'flex', bgcolor: 'secondary.light',height:'60px'}}>
                <TextField variant='standard'  className=" bg-transparent text-white ms-3 my-auto" placeholder={sectionTitle} onChange={(event) => setSectionTitle(event.target.value)}></TextField>
                <IconButton color='danger' sx={{my:'auto'}}>
                    <DeleteIcon />
                </IconButton>

            </Box>
        </div>


    )
}

export default Section;