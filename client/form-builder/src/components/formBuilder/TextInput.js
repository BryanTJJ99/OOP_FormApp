import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
const TextInput = (props) => { 
    return (
        <TextField variant = "standard" value={props.value} disabled>
        <div className="d-block">
            <input type="text" className="form-control" value={props.value} disabled></input>
        </div>
        </TextField>
        
    )
} 

export default TextInput;