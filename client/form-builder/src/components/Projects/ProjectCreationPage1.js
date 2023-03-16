import { React, useState, useEffect } from 'react'
import { Button, TextField, Typography, Autocomplete } from '@mui/material'
import './ProjectCreationPage.css';
// import axios from 'axios';
import axios from 'axios';



const ProjectCreationPage1 = (props) => {


  const { handleProjectDataChange, projectData } = props;

  const handleProjectNameChange = (e) => {
    handleProjectDataChange('projectName', e.target.value);
  }
    
  // const handleVendorCompanyNameChange = (e) => {
  //   handleProjectDataChange('vendorCompanyName', e.target.value);
  // }
  const handleVendorCompanyNameChange = (value) => {
    if (value) {
      handleProjectDataChange('vendorCompanyName', value.username);
    } else {
      handleProjectDataChange('vendorCompanyName', value.username);
    }
  };
    
  const handleProjectDescriptionChange = (e) => {
    handleProjectDataChange('projectDescription', e.target.value);
  }


  
  const apiUrl = 'http://localhost:8080/api/admin/allUsers';


  const [vendorData, setVendorData] = useState([]);

  // let vendorData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const userData = response.data;
        const vendorData = userData.filter(function getVendor(ele) {
          return ele.role == "ROLE_VENDOR";
        });
        setVendorData(vendorData);
        // console.log(vendorData);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    fetchData();
  }, []);

  


  //for Next button
  const [projectNameEntered, setProjectNameEntered] = useState(true);
  const [vendorCompanyNameEntered, setVendorCompanyNameEntered] = useState(true);
  const handleNextButtonClick = () => {
    if (projectData.projectName && projectData.vendorCompanyName) {
      props.setActivePage('2');
    } else {
      setProjectNameEntered(false);
      setVendorCompanyNameEntered(false);
    }
  };



  return (

    <div>
        {console.log(vendorData)}
        {console.log(projectData)}
        <br></br>
        <br></br>
        <Typography variant="h3" component="div" style={{ flexGrow: 1, margin: 30 }}>
          Create a new project
        </Typography>
        

        <div style={{ display: 'flex', justifyContent: 'center', margin: 20}}>
          <TextField
            id="ProjectName"
            label="Project Name"
            style={{ margin: 20, width: '300px' }}
            onChange={handleProjectNameChange}
            value={projectData.projectName}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={vendorData}
            getOptionLabel={(option) => option.username}
            style={{margin: 20, width: '300px' }}
            onChange={(event, value) => handleVendorCompanyNameChange(value)}
            value={
              vendorData.find((option) => option.username === projectData.vendorCompanyName) || null
            }
            renderInput={(params) => (
              <TextField
                {...params}
                id="VendorCompanyName"
                label="Vendor Company Name"
                value={projectData.vendorCompanyName}
                onChange={handleVendorCompanyNameChange}
              />
            )}
          />
        </div>


        <TextField id="ProjectDescription" 
                    label='Project Description'
                    multiline={true}
                    rows={10}
                    fullWidth={true}
                    style={{width: '800px'}}
                    onChange={handleProjectDescriptionChange}
                    value={projectData.projectDescription}
        />
        
        <br></br>
        <br></br>
        <br></br>


        <Button onClick={handleNextButtonClick} 
                style={{ backgroundColor: '#a8c7f7', color: 'inherit', height:50, width:150 }}
        >
        Next
        </Button>

        {!projectNameEntered && <h3>Please Enter Project Name</h3>}
        {!vendorCompanyNameEntered && <h3>Please Enter Vendor Company Name</h3>}

    </div>


  )
}

export default ProjectCreationPage1



