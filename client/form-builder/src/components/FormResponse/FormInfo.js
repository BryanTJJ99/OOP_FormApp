import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const FormInfo = (props) => {
    return (
        <div className="text-center mt-5">
            <Typography variant='h4'>{props.formTemplate.formName}</Typography>
            <Typography variant='p'>{props.formTemplate.formDescription}</Typography>
        </div>
    )
}

export default FormInfo;