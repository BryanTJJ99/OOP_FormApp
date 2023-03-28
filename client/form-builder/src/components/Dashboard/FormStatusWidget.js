import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NameAvatar from './NameAvatar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import StatusChip from './StatusChip'
import { ListItemIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect, Fragment } from 'react';
import { getAllFormResponses } from '../../services/DashboardAPI';

export default function FormStatusWidget(){
    const [statuses,setStatuses] = useState({})

    // obtaining the form data
    useEffect(() => {
      const fetchData = async () => {
        let formData = await getAllFormResponses()
        let data = classifyStatus(formData)
        setStatuses(data)
      }
      fetchData()
    }
    ,[])
    // helper function to process status => count for all forms
    const classifyStatus = (formData) => {
        let dict = {}
        formData.forEach(formObj => {
            if (formObj.status in dict){
                dict[formObj.status] += 1
            } else {
                dict[formObj.status] = 1
            }
        }); 
        return dict
    }
    return (
        <Box sx={{height: 350 ,pt:1,px:2}} variant="outlined">
          <Typography variant="h4" sx={{mt:2}}>
            Forms in Status
          </Typography>
          <List>
            {Object.keys(statuses).map((stat,idx)=>(
                <Fragment  key={idx}>
                <ListItem sx={{ m:0,p:1 }}>
                  <Box display="flex" width="80%" marginX="auto" justifyContent="center">
                    <ListItemText><StatusChip status={stat}/></ListItemText>
                    <ListItemText>{statuses[stat]}</ListItemText>
                  </Box>
                </ListItem>
                {idx!=5 && <Divider/>}
                </Fragment>
            ))
            }
          </List>
        </Box>
    );
}