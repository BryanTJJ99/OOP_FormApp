import { React, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { getProjectById, updateProject } from "../services/ProjectViewAPI.js";
import { Link } from "react-router-dom";

import {
  Box,
  Grid,
  TableCell,
  Table,
  Paper,
  colors,
  TextField,
  ModeEditIcon,
  InputAdornment,
  IconButton,
  Typography,
  Button, 
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText
  
} from "@mui/material";
import { Edit as EditIcon, SaveAs as SaveAsIcon } from "@mui/icons-material";
import { getUserById } from "../services/User.js";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SimpleDialog(props) {
    const { onClose, selectedValue, open, vendors } = props;
  
    const handleClose = () => {
        onClose(selectedValue);
      };
    
      const handleListItemClick = (value) => {
        onClose(value);
      };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
        <List sx={{ pt: 0 }}>
          {vendors.map((vendor) => (
            <ListItem disableGutters>
              <ListItemButton onClick={() => handleListItemClick(vendor)} key={vendor}>
                
                <ListItemText primary={vendor} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }
  
//   SimpleDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.string.isRequired,
//   };

const ProjectView = () => {
  const [project, setProject] = useState(null);
  const [editProjectName, setEditProjectName] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [editProjectDescription, setEditProjectDescription] = useState(false);
  const [projectDescription, setProjectDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [vendorIds, setVendorIds] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(async () => {
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const projectId = urlParams.get('projectId')
    await getProjectById("64174833f58e07308498e68a")
      .then((response) => {
        setProject(response);
        setProjectName(response.projectName)
        setProjectDescription(response.projectDescription)
        setVendorIds(response.vendorId)
        console.log(response);
        // for (const vendorId of response.vendorId) {
        //     console.log(vendorId);
        //     getUserById(vendorId).then(
        //     (response)=>{
        //         console.log(response);
        //         // vendors.push(response.name)
        //     }
        //     )
        // }
      })
      .catch((error) => {
        console.log(error.message);
      });
    
  }, []);

    
  const handleDialogOpen = () => {
    setOpenDialog(true);
    console.log(project.vendorId)
  };

  const handleDialogClose = (value) => {
    setOpenDialog(false);
    setSelectedVendor(value);
  };

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
        {/* <Typography variant="h1" component="h1"> */}
        <Button component={Link} to="/Project">Back to Project Index</Button>
        <TextField
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value);
          }}
          disabled={!editProjectName}
        //   size="large"
        //   sx={{fontSize: "5rem", height: "50%", width: "50%"}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {editProjectName ? (
                  <IconButton
                    aria-label="save project name"
                    onClick={() => {
                      setEditProjectName(!editProjectName);
                      project.projectName = projectName;
                      setProject(project);
                      updateProject(project);
                    }}
                  >
                    <SaveAsIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="edit project name"
                    onClick={() => setEditProjectName(!editProjectName)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
         
        />
        {/* </Typography> */}


        <TextField
        multiline
        maxRows={5}
          value={projectDescription}
          onChange={(e) => {
            setProjectDescription(e.target.value);
          }}
          disabled={!editProjectDescription}
          sx={{width: "90%"}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {editProjectDescription ? (
                  <IconButton
                    aria-label="save project description"
                    onClick={() => {
                        setEditProjectDescription(!editProjectDescription);
                        project.projectDescription = projectDescription;
                        setProjectDescription(project.projectDescription);
                        updateProject(project);
                    }}
                  >
                    <SaveAsIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="edit project description"
                    onClick={() => setEditProjectDescription(!editProjectDescription)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
         
        />



<Button variant="outlined" 
onClick={handleDialogOpen}
>
  Open simple dialog
</Button>
<SimpleDialog
  selectedValue={selectedVendor}
  open={openDialog}
  onClose={handleDialogClose}
  vendors={
    vendors
    }
/>

        <Link
          to={{
            pathname: '../components/Projects/ProjectCreationPage2',
            state: { projectName, projectDescription},
          }}
        >
          
          <Button variant="contained">Add Form</Button>
        </Link>


      {/* {console.log(project)} */}
      <Box sx={{ flexGrow: 1, height: 300 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>xs=2</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProjectView;
