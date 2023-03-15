import React, { useEffect, useState } from 'react';

const FormDetails = () => { 
    return ( 
        
        <div className='mx-5 mt-3 d-flex justify-content-center w-100'>
            <div className='card' >
                <div className='card-header bg-light rounded'> 
                    <div className='form-group mt-3'>
                        <label>Form Title:</label>
                        <input type='text' className="form-control"></input>
                    </div>
                    <div className='form-group my-3'>
                        <label>Form Description:</label>
                        <textarea className="form-control" rows='5'></textarea>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default FormDetails;