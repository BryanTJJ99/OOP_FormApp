import { React  , useState, Fragment, useEffect } from 'react' //rafce 
import { Button, Typography, TextField } from '@mui/material'
import FormTemplate from "./FormTemplate";
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';

//Imports for material table with cards
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip, 
  Grid
} from "@mui/material";
import FullScreenDialog from './CustomPopUp';


import { getFormTemplateData }  from '../../services/ProjectCreationPageAPI';



// const apiUrl = 'http://localhost:8080/api/admin/allUsers';


const ProjectCreationPage2 = (props) => {



    const [formTemplate, setformTemplate] = useState([])
    const [filterValue, setFilterValue] = useState(props.filterValue)
    const [rawData, setRawData] = useState()
    const [vendorData, setVendorData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          let forms = await getFormTemplateData();
          console.log(forms)
          // console.log(vendorData)
          // setformTemplate(forms);
          setRawData(forms)
          setformTemplate(forms)
          // console.log(vendorData);
        } catch (error) {
          console.log(error.message);
        }
      };
    
      fetchData();
    }, []);



    // For building filter logic
    function filter(event){
      // console.log(event.target.value)
      let filter_value = event.target.value
      let filtered_forms = []
      for(var form of rawData){
        let slice = form.name.toLowerCase().slice(0, filter_value.length)
        if(slice == filter_value.toLowerCase()){
          filtered_forms.push(form)
        }
      }
      setformTemplate(filtered_forms)
    }

    console.log(rawData)
    console.log(formTemplate)
    // for table with cards######################
    // const numRows = Math.ceil(formTemplate.length / 3);
    // const rows = Array.from({ length: numRows }, (_, i) => formTemplate.slice(i * 3, i * 3 + 3));

  return (
    
    <>
        <Typography variant="h3" component="div" style={{ flexGrow: 1, margin: 30 }}>
            Add Form For Vendor
        </Typography>
        


      {/* For container showing forms that are selected */}
      <Fragment>
        <CssBaseline />
          <Container maxWidth="sm" style={{ backgroundColor:"#cfe8fc", borderRadius:"20px"}}>
            Selected Form(s)<br/>
            {props.projectData.selectedForm.map((item) => (
              <Chip label={item.name} />
            ))}
          </Container>
      </Fragment>


        <br/>
        <br/>

        {/* FOR TABLE WITH CARDS */}
        {/* <TableContainer style={{ maxHeight: 800 }}>
            <Table stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{textAlign: "center"}}>
                          
                        <FullScreenDialog projectData={props.projectData} handleProjectDataChange={props.handleProjectDataChange}></FullScreenDialog>

                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <FilterAltIcon></FilterAltIcon>
                          <TextField id="standard-basic" label="Filter" variant="standard" value={filterValue} onChange={filter}/>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((item, columnIndex) => (
                                <TableCell key={columnIndex}>
                                    <FormTemplate
                                              id = {item.id}
                                              name={item.name}
                                              url={item.imageurl}
                                              description={item.description}
                                              projectData={props.projectData}
                                              handleProjectDataChange={props.handleProjectDataChange}
                                              >
                                      {item}
                                    </FormTemplate>
                                </TableCell>
                            ))}
                    
                            {row.length < 3 && (
                                <>
                                    {[...Array(3 - row.length)].map((_, i) => (
                                        <TableCell key={row.length + i}></TableCell>
                                    ))}
                                </>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> */}
            <Grid container spacing={2} justifyContent="center">
      {formTemplate.map((item) => (
        
        <Grid key={item.id} item xs={12} sm={6} md={4}>
          <FormTemplate
                id = {item._id}
                name={item.formName}
                url={item.imageurl}
                description={item.formDescription}
                projectData={props.projectData}
                handleProjectDataChange={props.handleProjectDataChange}
          >
                {item}
            </FormTemplate>
        </Grid>
      ))}
    </Grid>




        <br/>
        <br/>
        
        <Button onClick={() => props.setActivePage('1')} style={{ backgroundColor: '#a8c7f7', color: 'inherit', margin: 100, height:50, width:150 }}>Back</Button>

        <Button onClick={() => props.setActivePage('3')} style={{ backgroundColor: '#a8c7f7', color: 'inherit', margin: 100,  height:50, width:150 }}>Next</Button>


    </>


  )
}



export default ProjectCreationPage2


