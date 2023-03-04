import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
const SubmitBtn = () => {
    return (
        <div className="text-right">
            <Button className='float-end me-3' variant='contained'>
                Create Form
            </Button>
        </div>
    )
}

export default SubmitBtn;