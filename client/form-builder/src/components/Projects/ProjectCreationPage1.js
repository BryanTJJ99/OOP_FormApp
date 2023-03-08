import { React, useState } from 'react' //rafce 
import { Button, TextField, Typography } from '@mui/material'




const ProjectCreationPage1 = (props) => {

    const [projectName, setProjectName] = useState(props.projectName)
    const [vendorCompanyName, setVendorCompanyName] = useState(props.vendorCompanyName)
    const [projectDescription, setProjectDescription] = useState(props.projectDescription)

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value)
        props.setProjectName(e.target.value)
      }
    
    const handleVendorCompanyNameChange = (e) => {
        setVendorCompanyName(e.target.value)
        props.setVendorCompanyName(e.target.value)
      }
    
    const handleProjectDescriptionChange = (e) => {
        setProjectDescription(e.target.value)
        props.setProjectDescription(e.target.value)
      }


  return (
    
    <div>
        <br></br>
        <br></br>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add project
        </Typography>
        

        <TextField id="ProjectName" 
                    label='Project Name' 
                    style={{ margin: 40, width: '300px' }}
                    onChange={handleProjectNameChange}
                    value={props.projectName}
                    
        />
        
        <TextField id="VendorCompanyName" 
                    label='Vendor Company Name' 
                    style={{ margin: 40, width: '300px' }}
                    onChange={(e) => props.setVendorCompanyName(e.target.value)}
        />



        <TextField id="ProjectDescription" 
                    label='Project Description'
                    multiline={true}
                    rows={8}
                    fullWidth={true}
                    maxRows={4}
                    style={{width: '800px'}}
                    onChange={(e) => props.setProjectDescription(e.target.value)}
        />
        
        <br></br>
        <br></br>
        <br></br>


        <Button onClick={() => props.setActivePage('2')} style={{ backgroundColor: '#a8c7f7', color: 'inherit', height:50, width:150 }}>Next</Button>
    </div>


  )
}

export default ProjectCreationPage1



