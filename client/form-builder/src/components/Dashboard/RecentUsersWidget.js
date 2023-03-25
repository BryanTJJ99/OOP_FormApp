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
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { getRecentVendors} from '../../services/DashboardAPI';

export default function RecentUsersWidget(){
    const [recentVendors,setRecentVendors] = useState([])
    useEffect(()=>{
      const fetchData = async () => {
        let recentVendorData = await getRecentVendors(3)
        setRecentVendors(recentVendorData)
      }
      fetchData()
    }, [])
 
    function getDurationPast(createdAt) {
        let display;
        let diff = Date.now() - Date.parse(createdAt)
        let secsDiff = diff/1000
        let minsDiff = diff/60000
        let hoursDiff = minsDiff/60
        let daysDiff = hoursDiff/24
        if (daysDiff > 30){
            display = 'months ago'
        } else if (hoursDiff > 24){
            display = Math.round(daysDiff)+' days ago'
        } else if (minsDiff > 60){
            display = Math.round(hoursDiff) + ' hours ago'
        } else if (secsDiff >= 60){
            display = Math.round(minsDiff) + ' minutes ago'
        } else {
            display = 'seconds ago'
        }
        return display
    }
    // {
    //     "id": "641af4b859665d7ee68a5759",
    //     "username": "zxtest5",
    //     "email": "zxtest5@email.com",
    //     "password": "password",
    //     "role": "ROLE_VENDOR",
    //     "country": null,
    //     "createdAt": "2023-03-22T12:29:44.584+00:00",
    //     "deletedAt": null,
    //     "createdBy": {
    //         "id": null,
    //         "username": null,
    //         "email": null,
    //         "password": null,
    //         "role": null,
    //         "country": null,
    //         "createdAt": null,
    //         "deletedAt": null,
    //         "createdBy": null,
    //         "target": null,
    //         "source": null
    //     }
    // },
    return (
      <Stack sx={{height: 300}} alignItems="center" justifyContent="center" direction="column" variant="outlined">
        <Typography variant="h5" sx={{p:0 ,mb:1}}>
          Recently Added Vendors
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', my: 0, py:0}}>
        {recentVendors.map( (vendorObj,idx) => (
            <>
            <ListItem alignItems="flex-start" key={vendorObj.id}>
                <ListItemAvatar>
                <NameAvatar name={vendorObj.username}/>
                </ListItemAvatar>
                <ListItemText
                primary={vendorObj.username}
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {getDurationPast(vendorObj.createdAt)}
                    </Typography>
                    </React.Fragment>
                }/>
            </ListItem>
            { idx != (recentVendors.length-1) && <Divider variant="inset" component="li" />}
            </>
            )
        )} 
        </List>
      </Stack>
    )
  }