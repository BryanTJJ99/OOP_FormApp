import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const FormInfo = () => {
    return (
        <div className="text-center mt-5">
            <Typography variant='h4'>Form Title</Typography>
            <Typography variant='p'>This is the description of the form, which will contain a few lines</Typography>
        </div>
    )
}

export default FormInfo;