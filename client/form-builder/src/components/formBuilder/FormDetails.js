import React, { useEffect, useState } from 'react';
import { Card, TextField } from '@mui/material';

const FormDetails = () => { 
    return ( 
        
        <div className='mx-5 mt-4'>
            <Card>
                <div className='card-header bg-light rounded'> 
                    <div className='form-group mt-3 mb-3 text-left'>
                        <TextField name='formName' label="Form Title" variant='outlined' sx={{width: '100%'}}></TextField>
                    </div>
                    <div className='form-group my-3 text-left'>
                        <TextField name='formDescription' label="Form Description" variant='outlined' sx={{width: '100%'}} multiline rows={3}></TextField>
                    </div>
                </div>
            </Card>
        </div>
        
    )
}

export default FormDetails;