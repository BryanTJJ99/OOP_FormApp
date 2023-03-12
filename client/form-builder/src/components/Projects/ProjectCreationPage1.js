import { React, useState, useEffect } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import './ProjectCreationPage.css';



const ProjectCreationPage1 = (props) => {

    // const [projectName, setProjectName] = useState(props.projectName)
    // const [vendorCompanyName, setVendorCompanyName] = useState(props.vendorCompanyName)
    // const [projectDescription, setProjectDescription] = useState(props.projectDescription)


    // const handleProjectNameChange = (e) => {
    //     setProjectName(e.target.value)
    //     props.setProjectName(e.target.value)
    //   }
    
    // const handleVendorCompanyNameChange = (e) => {
    //     setVendorCompanyName(e.target.value)
    //     props.setVendorCompanyName(e.target.value)
    //   }
    
    // const handleProjectDescriptionChange = (e) => {
    //     setProjectDescription(e.target.value)
    //     props.setProjectDescription(e.target.value)
    //   }

  const { handleProjectDataChange, projectData } = props;

  const handleProjectNameChange = (e) => {
    handleProjectDataChange('projectName', e.target.value);
  }
    
  const handleVendorCompanyNameChange = (e) => {
    handleProjectDataChange('vendorCompanyName', e.target.value);
  }
    
  const handleProjectDescriptionChange = (e) => {
    handleProjectDataChange('projectDescription', e.target.value);
  }

    
      


  return (
    
    <div>
        <br></br>
        <br></br>
        <Typography variant="h3" component="div" style={{ flexGrow: 1, margin: 30 }}>
          Add Project
        </Typography>
        

        <TextField id="ProjectName" 
                    label='Project Name' 
                    style={{ margin: 40, width: '300px' }}
                    onChange={handleProjectNameChange}
                    value={projectData.projectName}
                    
        />
        
        <TextField id="VendorCompanyName" 
                    label='Vendor Company Name' 
                    style={{ margin: 40, width: '300px' }}
                    onChange={handleVendorCompanyNameChange}
                    value={projectData.vendorCompanyName}
        />



        <TextField id="ProjectDescription" 
                    label='Project Description'
                    multiline={true}
                    rows={8}
                    fullWidth={true}
                    maxRows={4}
                    style={{width: '800px'}}
                    onChange={handleProjectDescriptionChange}
                    value={projectData.projectDescription}
        />
        
        <br></br>
        <br></br>
        <br></br>


        <Button onClick={() => props.setActivePage('2')} style={{ backgroundColor: '#a8c7f7', color: 'inherit', height:50, width:150 }}>Next</Button>
    </div>


  )
}

export default ProjectCreationPage1



