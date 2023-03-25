import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NameAvatar from '../components/Dashboard/NameAvatar';
import RecentUsersWidget from '../components/Dashboard/RecentUsersWidget';
import FormStatusWidget from '../components/Dashboard/FormStatusWidget';
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
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { getAllVendors , getAllProjects , getAllFormResponses,} from '../services/DashboardAPI';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';




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
  // defining state variables
  const [totalVendors,setTotalVendors] = useState(0)

  // to be dynamic getAllVendors 

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    const fetchData = async () => {
      let vendorData = await getAllVendors()
      setTotalVendors(vendorData.length)
    }
    fetchData()
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);  
  
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
  // set state 
  const [totalProjects,setTotalProjects] = useState(0)

  // getAllProjects which comes from ProjectRepository.java 

  useEffect(()=>{
    const fetchData = async () => {
      let projectData = await getAllProjects()
      setTotalProjects(projectData.length)
    }
    fetchData()
  }, [])

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

const Dashboard = () => {
  // set state for form data
  const [forms,setForms] = useState({})

  // obtaining the form data
  useEffect(() => {
    const fetchData = async () => {
      let formData = await getAllFormResponses()
      console.log('here is form data---------')
      console.log(formData)
      console.log('end of form data---------')

      setForms(formData)
    }
    fetchData()
  }
  ,[])

  // styling dashboard
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))
  
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
        <Grid item xs={8}>
          <Item>
          <AreaChart
            width={700}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, fontSize: "12px", backgroundColor: '#ccc', outline: "none" }} />
            <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item><FormStatusWidget/></Item>
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