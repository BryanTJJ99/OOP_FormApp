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
import { useState, useEffect } from 'react';
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
        <Box sx={{height: 300 ,padding:5}} variant="outlined">
          <Typography variant="h6">
            Forms in Status
          </Typography>
          <List>
            {Object.keys(statuses).map((stat,idx)=>(
                <ListItem key={idx} sx={{ m:0,p:0 }}>
                    <ListItemText><StatusChip status={stat}/></ListItemText>
                    <ListItemText>{statuses[stat]}</ListItemText>
                </ListItem>
            ))
            }
          </List>
        </Box>
    );
}