import React, { useEffect, useState } from 'react';

const TextInput = (props) => { 
    return (
        <div className="d-block">
            <input type="text" className="form-control" value={props.value} disabled></input>
        </div>
    )
} 

export default TextInput;