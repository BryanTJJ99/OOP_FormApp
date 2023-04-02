import { useState, useEffect, Fragment } from "react";
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Tooltip, Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { getAllFormTemplate,  } from '../../services/FormTemplate.js';
import StatusChip from '../Dashboard/StatusChip.js';
import { getAllProjects , getAllFormResponses } from '../../services/DashboardAPI.js';
import CircularLoading from '../Dashboard/CircularLoading';


const STATUS_OPTIONS = ["vendor","approver","admin","rejected","approved"]
const columns = [
    {
      field: 'projectName',
      headerName: 'Project',
      width: 300,
      editable: false,
    
      renderCell: (params) => {
        return (
          <Box sx={{ overflowX: 'auto' }}>
            {params.row.projectName}
          </Box>
        )}
    },{
        field: 'name',
        headerName: 'Form',
        description: 'This column has a value getter and is not sortable.',
        renderCell: (params) => {
            return (
            <Button underline="none" href={params.row.formLink} sx={{cursor: 'pointer', overflowX: 'auto',}}>
                {params.row.name}
            </Button>
            )
        },
        editable: false,
        width: 500,
        overflowX: 'auto',

    },{
        field: 'dueDate',
        headerName: 'Due Date',
        description: 'Due Date of vendor forms',
        width:150,
        editable: false,
        overflowX:'auto',
        sorted: true,
        renderCell: (params) => {
            console.log(params.row.dueDate,'due date')
            return (
            <Box>
                {formatDate(params.row.dueDate)}
            </Box>
            )
        },
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
        overflowX: 'auto',
    },
  ];
//  helper function to convert utc date string to reader friendly version

const formatDate = (utcDate) => {
    utcDate = utcDate.replace('+00:00','Z')
    let jsDate =new Date(utcDate).toString()
    jsDate = jsDate.split(' ').slice(0,3).join(' ')
    return jsDate
}

const ClientFormTable = (props) => {
    const [formData,setFormData] = useState([])
    const [formResponses,setFormResponses] = useState([])
    const [formTemplates, setFormTemplates] = useState({}); 
    const [projects, setProjects] = useState({}); 
    // const [formsDue,setFormsDue] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const vendorId = props.vendorId;

    // isolated useEfect calls due to separate logic and no dependency
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
            // console.log(newFormTemplateDict)
            return newFormTemplateDict
          }

        // obtain project data
        const fetchProjectData = async() => {
          let projectData = await getAllProjects() 
          let newProjectDict = {};
          for (let proj of projectData) { 
            newProjectDict[proj.projectID] = proj.projectName; 
          }
          // console.log(newProjectDict)
          setProjects(newProjectDict);
          return newProjectDict
        }
        // obtain forms due 
       
        // function calls
        // chain to promiseAll and formatData
        Promise.allSettled([fetchFormResponses(),fetchFormTemplates(),fetchProjectData()]).then((response) => {
          // buggy, if console log not running then formatData wont run properly
          // console.log('promiseAll reponse',response)
          // console.log(response[0])
          // console.log(response[1])
          // console.log(response[2])
          // console.log(response[3])
          formatData(response)
          // console.log('promise all settled, loading should be set to false')
          setIsLoading(false);
        }
        )
      }
      ,[])
    
      const formatData = (response) => {
        let formData = []
        let formResponses = response[0].value
        let formTemplates = response[1].value
        let projects = response[2].value

        let counter = 1
        // console.log(formResponses)
        // console.log(users,'users state')
        // console.log(formTemplates,'form templates state')
        // console.log(projects,'projects state')
        for (let formResponse of formResponses){
        //   console.log(formResponse,'formResponse')
          let templateId = formResponse.formTemplateId; 
          // let templateName = formTemplateDict[templateId]; 
          let templateName = formTemplates[templateId]; 
          // let vendor = userDataDict[formResponse.vendorId]
          let deadline = formResponse.vendorDeadline;
          // console.log(formResponse.deadline,'deadline')
          // let project = projectDataDict[formResponse.projectId]
          if (formResponse.projectId in projects){
            var project = projects[formResponse.projectId]
          } else {
          // if projectid deleted from db
            var project = "Project test"
          }
    
          // KEN MING CCHANGED SOMETHING HERE
          if(formResponse.vendorId == vendorId){
            let formStatus = formResponse.status; 
            let formEntry = {
                id: counter,
                name: templateName, 
                status: formStatus, 
                projectName: project,
                projectLink: `/projectView?projectId=${formResponse.projectId}`,
                formLink: '/FormResponse?formResponseId='+formResponse.formResponseId,
                dueDate: deadline,
            }
            formData.push(formEntry)
            counter++
          } 
        } 
        formData.sort((a,b) => a.dueDate - b.dueDate)
        setIsLoading(true)
        setFormData(formData)
        // setFormsDueToday(formsDue)
        // console.log(formsDue,'forms due')
        // console.log('form Data',formData)
    
      }

 

    // const fetchFormsDue = async () => {
    //     let today = new Date()
    //     let end = new Date()
    //     end.setDate(today.getDate()+daysOut)
    //     end = end.toISOString().replace('Z','+00:00')
    //     today = today.toISOString().replace('Z','+00:00')
    //     // get forms due in the next 7 days 
    //     let formsDueSoon = await getFormsDue(today,end)
    //     formsDueSoon = formsDueSoon.filter( form => form.vendorId == vendorId)
    //     formsDueSoon = formsDueSoon.map( form => ({...form, 'id':`${form.formResponseId}`,'projectName':`${}`}))
    //     console.log(formsDueSoon,'forms due soon')
    //     formsDueSoon.sort((a,b) => a.vendorDeadline - b.vendorDeadline)
    //     setFormsDue(formsDueSoon)
    // }

    // const fetchFormTemplates = async() => {
    //     let formTemplates = await getAllFormTemplate() 
    //       let newFormTemplateDict = {} 
    //       for (let form of formTemplates) { 
    //         newFormTemplateDict[form.formTemplateId] = form.formName; 
    //       }
  
    //     setFormTemplates(newFormTemplateDict);
    // }
    // const fetchProjectData = async() => {
    //     let projectData = await getAllProjects() 
    //     let newProjectDict = {};
    //     for (let proj of projectData) { 
    //       newProjectDict[proj.projectID] = proj.projectName; 
    //     }
    //     // console.log(newProjectDict)
    //     setProjects(newProjectDict);
    //     return newProjectDict
    // }
    

    return (
    <Box sx={{minHeight: 350 ,padding:1,width:"100%"}} 
        variant="outlined">
        {isLoading && <CircularLoading/>}
        <DataGrid
            autoHeight
            rows={formData}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: {
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
        {/* <TableContainer sx={{maxHeight: 240,}}>
        <Table sx={{ minWidth: 650, overflow: "scroll", width: '100%', [`& .${tableCellClasses.root}`]: {borderBottom: "none" } }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Project</TableCell>
                    <TableCell align="left">Form</TableCell>
                    <TableCell align="left">Due Date</TableCell>
                    <TableCell align="left">Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {formsDue.map((form,idx) => (
                <TableRow
                key={idx}
                >
                <TableCell component="th" scope="row">
                { users[form.vendorId]? users[form.vendorId][0]: "vendor is deleted"}
                </TableCell>
                <TableCell align="right">
                    <Button underline="none" href={'/FormResponse?formResponseId='+form.formResponseId} sx={{cursor: 'pointer'}}>
                    {formTemplates[form.formTemplateId]} 
                    </Button>
                </TableCell>
                <TableCell align="right">{formatDate(form.vendorDeadline)}</TableCell>
                <TableCell align="right"><StatusChip status={form.status}/></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer> */}
    </Box>
   

    
    )
}

export default ClientFormTable;