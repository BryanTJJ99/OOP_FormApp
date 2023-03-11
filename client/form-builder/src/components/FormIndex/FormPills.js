import React, { useEffect, useState } from 'react';
import { Chip, Box } from '@mui/material';

const FormPills = (props) => { 
    const [pillArea, setPillArea] = useState(Array(0)); 
    const statusColourMap = {complete: 'success', partial: 'warning', unfilled: 'danger'}

    useEffect(() => { 
        let newPillArea = []; 
        console.log(props.forms.formattedValue)
        for (let form of props.forms.formattedValue) { 
            newPillArea.push(<Chip 
                                label={form.name} 
                                sx={{mr: 1}} 
                                color={statusColourMap[form.status]}
                                component="a" 
                                href={form.link}
                                clickable
                            />);
        }
        setPillArea(newPillArea);
        console.log(pillArea)
    }, []);

    return ( 
        <div className='d-flex w-75' id={'Form'+props.id}> 
            {pillArea}
        </div>
    )
}

export default FormPills;