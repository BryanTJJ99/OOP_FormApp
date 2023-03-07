import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { borderRadius } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete'
//TO DO add delete function for section
const Section = (props) => {
    const [sectionTitle, setSectionTitle] = useState(`Section ${props.sectionNum} Title`);

    return (

        <div id={'Section' + props.sectionNum} className='mb-3'>

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

{/* <div  id={'Section' + props.sectionNum}>
                    
                    <Box sx = {{bgcolor:'secondary.main' ,borderRadius:'8px'}}>
                        
                        <Box sx = {{display:'flex',justifyContent:'space-between',alignItems:'flex-end',mb:2}}>
                            <input type="text" className="form-control section_container bg-transparent text-white me-3" value={sectionTitle} onChange={(event) => setSectionTitle(event.target.value)}></input>
                            <button className="btn btn-danger btn-rounded btn-sm ml-2 delete_section">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                </svg>
                            </button>
                        </Box>
                    </Box>
            </div> */}