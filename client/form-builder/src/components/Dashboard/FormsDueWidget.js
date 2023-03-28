import { useState, useEffect, Fragment } from "react";
import { Slider, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Tooltip, Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getFormsDue } from '../../services/DashboardAPI';
import { getAllUsers } from '../../services/User.js';
import { getAllFormTemplate,  } from '../../services/FormTemplate.js';
import StatusChip from './StatusChip';


const FormsDueWidget = () => {
    const [daysOut,setDaysOut] = useState(7)
    const [formsDue,setFormsDue] = useState([])
    const [formTemplates, setFormTemplates] = useState({}); 
    const [users, setUsers] = useState({}); 

    // isolated useEfect calls due to separate logic and no dependency
    useEffect(() => {
        fetchFormsDue()
    },[daysOut])

    useEffect(() => {
        fetchFormTemplates()
        fetchUserData()
    },[])

    //  helper function to convert utc date string to reader friendly version
    const formatDate = (utcDate) => {
        utcDate = utcDate.replace('+00:00','Z')
        let jsDate =new Date(utcDate).toString()
        jsDate = jsDate.split(' ').slice(0,3).join(' ')
        return jsDate
    }

    const fetchFormsDue = async () => {
        let today = new Date()
        let end = new Date()
        end.setDate(today.getDate()+daysOut)
        end = end.toISOString().replace('Z','+00:00')
        today = today.toISOString().replace('Z','+00:00')
        // get forms due in the next 7 days 
        let formsDueSoon = await getFormsDue(today,end)
        console.log(formsDueSoon,'forms due soon')
        formsDueSoon.sort((a,b) => a.vendorDeadline - b.vendorDeadline)
        setFormsDue(formsDueSoon)
    }

    const fetchFormTemplates = async() => {
        let formTemplates = await getAllFormTemplate() 
          let newFormTemplateDict = {} 
          for (let form of formTemplates) { 
            newFormTemplateDict[form.formTemplateId] = form.formName; 
          }
  
        setFormTemplates(newFormTemplateDict);
    }
    
    const fetchUserData = async() => {
        let userData = await getAllUsers()
        let newUserDict = {}; 
        for (let user of userData) { 
            newUserDict[user.id] = [user.name,user.email]; 
        }
        setUsers(newUserDict);
    }

    return (
    <Box sx={{height: 350 ,padding:1}} 
        variant="outlined">
        <Typography variant="h5" sx={{mt:1,mb:2}}>
            Drag to view upcoming forms due in {daysOut} days
        </Typography>
        <Box sx={{height:40,px:5,my:1}}> 
        <Tooltip title="Customise range from today">
            <Slider 
                aria-label="Days" defaultValue={7} valueLabelDisplay="auto" step={2} marks min={1} max={30}
                onChange={ (e, val) => setDaysOut(val) }  
                // onDragStop={ (e) => setDaysOut(this.val) }
                />
        </Tooltip>
        </Box>
        <TableContainer sx={{maxHeight: 240,}}>
        <Table sx={{ minWidth: 650, overflow: "scroll", width: '100%', [`& .${tableCellClasses.root}`]: {borderBottom: "none" } }} aria-label="simple table">
            <TableBody>
            {formsDue.map((form,idx) => (
                <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                { users[form.vendorId]? users[form.vendorId][0]: "vendorDeletedError"}
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
        </TableContainer>
    </Box>
   

    
    )
}

export default FormsDueWidget