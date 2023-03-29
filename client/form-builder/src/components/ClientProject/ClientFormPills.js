import React, { useEffect, useState } from 'react';
import { Chip, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import StatusChip from '../Dashboard/StatusChip';

const ClientFormPills = (props) => { 
    const [pillArea, setPillArea] = useState(Array(0)); 
    const statusColourMap = {complete: 'error', partial: 'warning', unfilled: 'secondary'}
    const statusIconMap = {complete: <ErrorIcon></ErrorIcon>, partial: null, unfilled: null}

    useEffect(() => { 
        let newPillArea = []; 
        // console.log(props.forms.formattedValue)
        for (let form of props.forms.formattedValue) { 
            // newPillArea.push(<Chip 
            //                     icon={statusIconMap[form.status]}
            //                     label={form.name} 
            //                     sx={{mr:1,
            //                         // whiteSpace: 'normal',
            //                         // lineHeight: '1',
            //                         // display: 'flex',
            //                         // alignItems: 'center',
            //                         // maxWidth: '100%',
            //                         // '& > .MuiChip-label': {
            //                         //     flexWrap: 'wrap',
            //                         //     whiteSpace: "normal",
            //                         //     textOverflow: "clip",
            //                         //     textAlign: "center",
            //                         //   }
            //                         '&:hover .MuiChip-label, &:hover .MuiChip-icon': {
            //                             color: 'white'
            //                           }
            //                         }} 
            //                     color={statusColourMap[form.status]}
            //                     component="a" 
            //                     href={form.link}
            //                     clickable
            //                     size="large"
                                
                                
            //                 />);

            newPillArea.push(<StatusChip projPill={true} name={form.name} status={form.status} link={form.link}></StatusChip>)
        }
        setPillArea(newPillArea);
        // console.log(pillArea)
    }, []);

    return ( 
        <div className='d-flex w-100' id={'Form'+props.id} style={{ 
            overflowX: 'auto',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            '&:hover': {
                overflowY: 'auto'
            }
        }}> 
            {pillArea}
        </div>
    )
}

export default ClientFormPills;