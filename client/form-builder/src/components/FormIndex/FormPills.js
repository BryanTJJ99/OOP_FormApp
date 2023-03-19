import React, { useEffect, useState } from 'react';
import { Chip, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const FormPills = (props) => { 
    const [pillArea, setPillArea] = useState(Array(0)); 
    const statusColourMap = {complete: 'error', partial: 'secondary', unfilled: 'secondary'}
    const statusIconMap = {complete: <ErrorIcon></ErrorIcon>, partial: null, unfilled: null}

    useEffect(() => { 
        let newPillArea = []; 
        // console.log(props.forms.formattedValue)
        for (let form of props.forms.formattedValue) { 
            newPillArea.push(<Chip 
                                icon={statusIconMap[form.status]}
                                label={form.name} 
                                sx={{mr: 1}} 
                                color={statusColourMap[form.status]}
                                component="a" 
                                href={form.link}
                                clickable
                            />);
        }
        setPillArea(newPillArea);
        // console.log(pillArea)
    }, []);

    return ( 
        <div className='d-flex w-75' id={'Form'+props.id}> 
            {pillArea}
        </div>
    )
}

export default FormPills;