import { React, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { getProjectById } from '../services/ProjectViewAPI.js';

import { Box, Grid, TableCell, Table, Paper, colors } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const ProjectView = () => {

  const [project, setProject] = useState(null); 


  useEffect(() => {
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const projectId = urlParams.get('projectId')
    getProjectById("64174833f58e07308498e68a")
      .then(response => {
        setProject(response);
        console.log(response);
      })
      .catch(error => {
        console.log(error.message);
      })

  }, [])

    // console.log(project.projectName)


  // const handleTextChange = (event, index) => {
  //   const  value  = event.target;
  //   setProjectName(prevData => {
  //     const newData = [...prevData];
  //     newData[index] = value;
  //     return newData;
  //   });
  // };




  return (
    
    <>
      {/* {console.log(project)} */}
      <Box sx={{ flexGrow: 1 , height: 300}} >
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))}
      </Grid>
    </Box>

    </>


  )
}

export default ProjectView