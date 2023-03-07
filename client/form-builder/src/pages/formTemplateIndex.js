import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormTable } from '../components/FormIndex/index.js';

const FormSummary = (props) => {
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>

            <div className="text-center my-5">
                <Typography variant='h4'>View the Form Responses</Typography>
                <Typography variant='p'>Check the status of the forms that have been assigned to a vendor-project pair.</Typography>
            </div>
            <FormTable sx={{mx: 'auto'}}/>
        </>
    );
};

export default FormSummary;