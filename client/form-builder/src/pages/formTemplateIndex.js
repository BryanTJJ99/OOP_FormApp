import { Typography, Button, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormTable } from '../components/FormTemplateIndex/index.js';

            
const FormTemplateIndex = (props) => {
    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>

            <div className="text-center my-5">
                <Typography variant='h4'>View the Form Templates</Typography>
                <Typography variant='p'>Click on the form templates below to see the forms that you will assign to vendors.</Typography>
            </div>
            <Box sx={{width: '80%', marginX: 'auto', marginBottom: 3, display: 'flex'}}>
                <Button variant="contained" color="primary" component="a" href="/FormBuilder">Create New Template</Button>
            </Box>
            <div>
                <FormTable/>
            </div>
        </div>
    );
};

export default FormTemplateIndex;