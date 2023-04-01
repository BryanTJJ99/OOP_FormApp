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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
          <Typography variant="h4" sx={{my:1}}>
            Forms in Status
          </Typography>
          <Table sx={{ width: 350, overflow: "scroll", width: '100%', [`& .${tableCellClasses.root}`]: {borderBottom: "none" } }}>
            <TableBody>
            {Object.keys(statuses).map((stat,idx)=>(
                <Fragment key={idx}>
                <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, p:0, m:0 }}
                >
                <TableCell component="th" scope="row" sx={{p:0,m:0}}>
                  <StatusChip status={stat}/>
                </TableCell>
                <TableCell align="center"><Typography sx={{p:0,m:0,}}>{statuses[stat]}</Typography></TableCell>
                </TableRow>
                </Fragment>  
            ))
            }
            </TableBody>
          </Table>
        </Box>
    );
}