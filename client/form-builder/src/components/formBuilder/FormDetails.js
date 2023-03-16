import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';

const FormDetails = () => { 
    return ( 
        
        <div className='mx-5'>
            <Card>
                <div className='card-header bg-light rounded'> 
                    <div className='form-group mt-3 text-left'>
                        <label>Form Title:</label>
                        <input type='text' className="form-control"></input>
                    </div>
                    <div className='form-group my-3 text-left'>
                        <label>Form Description:</label>
                        <textarea className="form-control" rows='5'></textarea>
                    </div>
                </div>
            </Card>
        </div>
        
    )
}

export default FormDetails;