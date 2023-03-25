import { Typography, Box, Button, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormTable } from '../components/FormIndex/index.js';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const FormSummary = (props) => {
    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>

            <div className="text-center my-5">
                <Typography variant='h4'>View Projects</Typography>
                <Typography variant='p'>Check the status of all the vendor-project pairs</Typography>
            </div>
            <Box sx={{width: '80%', marginX: 'auto', marginBottom: 3, display: 'flex'}} justifyContent="end">
                <Button backgroundColor="primary" variant="contained" href="/ProjectCreation" sx={{textDecoration:"none","&:hover": {color: "#FFF"}}}><AddCircleIcon sx={{mr:1}}/>Create New Project</Button>
            </Box>
            <div>
                <FormTable sx={{mx: 'auto'}}/>
            </div>
        </div>
    );
};

export default FormSummary;