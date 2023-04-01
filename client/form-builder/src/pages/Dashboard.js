import React from 'react';
import NameAvatar from '../components/Dashboard/NameAvatar';
import FormStatusWidget from '../components/Dashboard/FormStatusWidget';
import RecentUsersWidget from '../components/Dashboard/RecentUsersWidget';
import FormsDueWidget from '../components/Dashboard/FormsDueWidget';
import CircularLoading from '../components/Dashboard/CircularLoading';
import StatusChip from '../components/Dashboard/StatusChip';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Typography, Button, Grid, Paper, Box, Link, Tooltip } from '@mui/material';
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
import { getAllVendors , getAllProjects , getAllFormResponses } from '../services/DashboardAPI';
import { getAllFormTemplate } from '../services/FormTemplate.js';
import { getAllUsers } from '../services/User.js';




// columns will be Project Name, Vendor Name, Avatar (from vendor), Forms (each row is one form), Vendor, Admin, Approver (status tick or X)
const STATUS_OPTIONS = ["vendor","approved","admin","rejected","approved"]
const columns = [
    {
      field: 'projectName',
      headerName: 'Project',
      width: 200,
      editable: false,
      renderCell: (params) => {
        return (
          <Button underline="none" href={params.row.projectLink} sx={{cursor: 'pointer'}}>
          {params.row.projectName}
          </Button>
        )}
    },
    {
      field: 'vendorName',
      headerName: 'Vendor',
      width: 150,
      editable: false,
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
      disableExport: true,
      editable: false,

    },
    {
      field: 'email',
      headerName: 'Email',
      renderCell: (params) => {
        return(
          <Tooltip title="send an email" sx={{cursor: 'pointer'}}>
          <Link underline="hover" onClick={()=> window.open(`mailto:${params.row.email}`)}>
              {params.row.email}
          </Link>
          </Tooltip>
        )
      },
      width: 200,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Form',
      description: 'This column has a value getter and is not sortable.',
      renderCell: (params) => {
        return (
          <Button underline="none" href={params.row.formLink} sx={{cursor: 'pointer'}}>
            {params.row.name}
          </Button>
        )
      },
      editable: false,
      width: 300,
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
    <Box sx={{height: 200 ,padding:3}} 
    variant="outlined">
      <Typography variant="h5">
        Total Vendors
      </Typography>
      <PeopleAltIcon sx={{height:80, width: 80, mx: 1, my:2, color:"#63676e"}}/>
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
    <Box sx={{height: 350 ,padding:5}} 
    variant="outlined">
      <Typography variant="h4" marginTop="30px">
        Total Projects
      </Typography>
      <FolderCopyIcon sx={{height:150, width: 150, mx: 1, my:2, color:"#63676e"}}/>
      <span style={{fontSize: "24px"}}>{totalProjects}</span>
    </Box>
  )
}

const Dashboard = () => {
  // set state for form data
  const [formData,setFormData] = useState([])
  const [formResponses,setFormResponses] = useState([])
  const [formTemplates, setFormTemplates] = useState({}); 
  const [users, setUsers] = useState({}); 
  const [projects, setProjects] = useState({}); 
  const [isLoading, setIsLoading] = useState(true);
  // obtaining the form response data
  useEffect(() => {
    const fetchFormResponses = async () => {
      let formResponses = await getAllFormResponses()
      // array of objects that look like
      // formResponseId
      // vendorId
      // projectId
      // status
      // deadline
      setFormResponses(formResponses)
      // console.log(formResponses,'formResponses')
      return formResponses
    }
    // obtain formTemplate data
    const fetchFormTemplates = async() => {
      let formTemplates = await getAllFormTemplate() 
        let newFormTemplateDict = {} 
        for (let form of formTemplates) { 
          newFormTemplateDict[form.formTemplateId] = form.formName; 
        }

        setFormTemplates(newFormTemplateDict);
        return newFormTemplateDict
      }
    // obtain user data
    const fetchUserData = async() => {
      let userData = await getAllUsers()
      let newUserDict = {}; 
      for (let user of userData) { 
        newUserDict[user.id] = [user.name,user.email]; 
      }
      setUsers(newUserDict);
      return newUserDict
    }
    // obtain project data
    const fetchProjectData = async() => {
      let projectData = await getAllProjects() 
      let newProjectDict = {};
      for (let proj of projectData) { 
        newProjectDict[proj.projectID] = proj.projectName; 
      }
      setProjects(newProjectDict);
      return newProjectDict
    }
    // obtain forms due 
   
    // function calls
    // chain to promiseAll and formatData
    Promise.allSettled([fetchFormResponses(),fetchFormTemplates(),fetchUserData(),fetchProjectData()]).then((response) => {
      // buggy, if console log not running then formatData wont run properly
      // console.log('promiseAll reponse',response)
      // console.log(response[0])
      // console.log(response[1])
      // console.log(response[2])
      // console.log(response[3])
      formatData(response[0].value)
      setIsLoading(false);
    }
    )
  }
  ,[])

  const formatData = (formResponses) => {
    let formData = []
    // let formsDue = []
    // const today = new Date()
    // let tomorrow  = new Date()
    // let following = new Date()
    // tomorrow.setDate(today.getDate()+1)
    // following.setDate(today.getDate()+2)
    // const upcoming = [today,tomorrow,following]
    let counter = 1

    for (let formResponse of formResponses){
      let templateId = formResponse.formTemplateId; 
      // let templateName = formTemplateDict[templateId]; 
      let templateName = formTemplates[templateId]; 
      // let vendor = userDataDict[formResponse.vendorId]
      let deadline = formResponse.vendorDeadLine;
      // console.log(formResponse.deadline,'deadline')
      if(formResponse.Id in users){
        var vendor = users[formResponse.vendorId]
      } else{
        // console.log('vendor error')
        var vendor = ['dummy1','dummy@gmail.com']
      }
      // let project = projectDataDict[formResponse.projectId]
      if (formResponse.projectId in projects){
        var project = projects[formResponse.projectId]
      } else {
        // if projectid deleted from db
        var project = "Project test"
      }

      let formStatus = formResponse.status; 
      let formEntry = {
        id: counter,
        name: templateName, 
        status: formStatus, 
        // vendor is buggy atm
        vendorName: vendor[0],
        email: vendor[1],
        projectName: project,
        projectLink: `/projectView?projectId=${formResponse.projectId}`,
        formLink: '/FormResponse?formResponseId='+formResponse.formResponseId,
        dueDate: deadline,
      }
      // console.log(deadline,'deadline')
      // if (upcoming.includes(deadline)){
      //   formsDue.push(formEntry)
      // }
      formData.push(formEntry)
      counter++
    } 
    setFormData(formData)
    // setFormsDueToday(formsDue)
    // console.log(formsDue,'forms due')
    // console.log('form Data',formData)

  }

  // styling dashboard
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {isLoading && <CircularLoading/>}
      <Grid container spacing={2} style={{height:"100%"}}>
        <Grid item xs={4}>
          <Item><ProjectWidget/></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><RecentUsersWidget/></Item>
          {/* <Item><UserWidget/></Item> */}
        </Grid>
        <Grid item xs={4}>
          <Item>
            <FormStatusWidget/>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <FormsDueWidget/>
          </Item>
        </Grid>
        {/* <Grid item xs={8}>
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
        </Grid> */}     
        <Grid item xs={12}>
          <Item sx={{m:0,p:0}}>
            <Tooltip title="Switch to toggle filter and sort " placement="top-end">
            <Box sx={{ height: 423,width:"100%", boxShadow:0}}>
            <DataGrid
              rows={formData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 6,
                  },
                },
              }}
              sx={{
                '& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaderTitle': {
                  backgroundColor: "primary.main",
                  color:"white",
                  fontWeight: 'bold',
                },
              }}
              pageSizeOptions={[10]}
              checkboxSelection={false}
              disableRowSelectionOnClick
            />
            </Box>
            </Tooltip>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}


export default Dashboard;