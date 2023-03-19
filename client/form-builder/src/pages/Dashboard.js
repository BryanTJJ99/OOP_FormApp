import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NameAvatar from '../components/Dashboard/NameAvatar';
import StatusChip from '../components/Dashboard/StatusChip';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios'


// columns will be Project Name, Vendor Name, Avatar (from vendor), Forms (each row is one form), Vendor, Admin, Approver (status tick or X)
const STATUS_OPTIONS = ["Filled","Approved","Reviewed","Rejected","PartiallyFilled","Approved"]
const columns = [
    {
      field: 'projectName',
      headerName: 'Project name',
      width: 150,
      editable: false,
    },
    {
      field: 'vendorName',
      headerName: 'Vendor name',
      width: 150,
      editable: true,
    },
    {
      field: 'avatar',
      headerName: 'Avatar',
      renderCell:(params) => { 
      return (
        <NameAvatar name={params.row.vendorName}/>
      )},
      sortable: false,
      filterable: false,
      groupable: false,
      aggregable: false,
      disableExport: true
    },
    {
      field: 'vendorEmail',
      headerName: 'Email',
      renderCell: (params) => {
        return(
          <Link underline="hover" >
            {params.row.vendorEmail}
          </Link>
          // <Link to='javascript:void(0)'
          //       // onClick={() => window.location.href = `mailto:${params.row.vendorEmail}`}
          // >
          //   {params.row.vendorEmail}
          // </Link>
        )
      },
      width: 150,
      editable: true,
    },
    {
      field: 'form',
      headerName: 'Form',
      description: 'This column has a value getter and is not sortable.',
      renderCell: (params) => {
        return (
          <Link underline="none" sx={{cursor: 'pointer'}}>
            {params.row.form}
          </Link>
        )
      },
      editable: false,
      width: 250,
    }, {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => {
        return (
          <StatusChip status={params.row.status}/>
        )
      },
      type: 'singleSelect',
      valueOptions: STATUS_OPTIONS,
      width: 150,
      editable: false,
    },
    // {
    //   field: 'vendorStatus',
    //   headerName: 'Vendor',
    //   description: 'This column contains a boolean is not sortable.',
    //   width: 110,
    //   editable: true,
    // },{
    //   field: 'adminStatus',
    //   headerName: 'Admin',
    //   description: 'This column contains a boolean is not sortable.',
    //   width: 110,
    //   editable: true,
    // },{
    //   field: 'approverStatus',
    //   headerName: 'Approver',
    //   description: 'This column contains a boolean is not sortable.',
    //   width: 110,
    //   editable: true,
    // },

    
  ];

// to getAllFormResponses using findAll() in FormResponseRepository

const rows = [
    { id: 1, projectName: 'Cloud', vendorName: 'Kong Leong', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 2, projectName: 'Cloud', vendorName: 'Justin', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Rejected'},
    { id: 3, projectName: 'DigiX', vendorName: 'Accenture', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'PartiallyFilled'},
    { id: 4, projectName: 'DigiX', vendorName: 'Tata', vendorEmail: 'abc@gmail.com' ,form: 'Safety Assessment', status: 'Open'},
    { id: 5, projectName: 'SmartNation', vendorName: 'NCS', vendorEmail: 'abc@gmail.com' ,form: 'Optional Sub-Contractor survey', status: 'Reviewed'},
    { id: 6, projectName: '5G', vendorName: 'NCS', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 7, projectName: '5G', vendorName: 'NCS', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 8, projectName: '5G', vendorName: 'NCS', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 9, projectName: '5G', vendorName: 'NCS', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 10, projectName: '5G', vendorName: 'NCS', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Approved'},
    { id: 11, projectName: '5G', vendorName: 'Bitch Ass', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
  ];
 

const UserWidget = () => {
  // to be dynamic getAllVendors 

  const vendor_url = "http://localhost:8080/api/admin/allVendors"

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get(vendor_url)
        .then(response => {
          console.log(response.data)
          setTotalVendors(response.data.total)
        });
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);  
  const [totalVendors,setTotalVendors] = useState(0)
  
  return (
    <Box sx={{height: 300 ,padding:5}} 
    variant="outlined">
      <Typography variant="h4">
        Total Vendors
      </Typography>
      <PeopleAltIcon sx={{height:150, width: 150, mx: 1, color:"#63676e"}}/>
      <span style={{fontSize: "24px"}}>{totalVendors}</span>
    </Box>
  )
}
const ProjectWidget = () => {
  // to be dynamic 
  // getAllProjects which comes from ProjectRepository.java but currently no methods written inside yet

  const totalProjects = 11020
  return (
    <Box sx={{height: 300 ,padding:5}} 
    variant="outlined">
      <Typography variant="h4">
        Total Projects
      </Typography>
      <FolderCopyIcon sx={{height:150, width: 150, mx: 1, color:"#63676e"}}/>
      <span style={{fontSize: "24px"}}>{totalProjects}</span>
    </Box>
  )
}


const RecentUsersWidget = () => {
  return (
    <Box sx={{height: 300}} variant="outlined">
      <Typography variant="h6" sx={{p:0 ,m:0}}>
        Recently Added Users
      </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', my: 0, py:0}}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <NameAvatar name="Remy Sharp"/>
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <NameAvatar name="Travis Howard" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <NameAvatar name="Cindy Baker"/>
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Box>
  )
}

const Dashboard = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} style={{height:"100%"}}>
        <Grid item xs={4}>
          <Item><UserWidget/></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><ProjectWidget/></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><RecentUsersWidget/></Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Box sx={{ height: 631,width:1100, boxShadow:2}}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              checkboxSelection={false}
              disableRowSelectionOnClick
            />
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}


export default Dashboard;