import { React  , useState, Fragment } from 'react' //rafce 
import { Button, Typography, TextField } from '@mui/material'
import FormTemplate from "./FormTemplate";
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';

//Imports for material table with cards
import { makeStyles } from "@material-ui/core/styles";
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
  Chip
} from "@material-ui/core";



const ProjectCreationPage2 = (props) => {

        //Dummy Dataset
        const formTemplateData = [
          {
            id: 1,
            imageurl:
              "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            name: "Colorful sneakers",
            description: "Some text about the product..",
          },
          {
            id: 2,
            imageurl:
              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            name: "Sport sneakers",
            description: "Some text about the product..",
          },
          {
            id: 3,
            imageurl:
              "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            name: "iWatch",
            description: "Some text about the product..",
          },
          {
            id: 4,
            imageurl:
              "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            name: "Water Bottle",
            description: "Some text about the product..",
          },
          {
            id: 5,
            imageurl:
              "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            name: "Vans sneakers",
            description: "Some text about the product..",
          },
          {
            id: 6,
            imageurl:
              "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            name: "Coco Noir",
            description: "Some text about the product..",
          },
          {
            id: 7,
            imageurl:
              "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            name: "Sunglasses",
            description: "Some text about the product..",
          },
          {
            id: 8,
            imageurl:
              "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            name: "Dove cream",
            description: "Some text about the product..",
          },
        ];



    const [formTemplate, setformTemplate] = useState(formTemplateData)
    const [filterValue, setFilterValue] = useState(props.filterValue)
    const [selectedForm, setSelectedForm] = useState([]);


    // For building filter logic
    function filter(event){
      // console.log(event.target.value)
      let filter_value = event.target.value
      let filtered_forms = []
      for(var form of formTemplateData){
        let slice = form.name.toLowerCase().slice(0, filter_value.length)
        if(slice == filter_value.toLowerCase()){
          filtered_forms.push(form)
        }
      }
      setformTemplate(filtered_forms)
    }

    
    // //For Carousell###################
    // const responsive = {
    //     superLargeDesktop: {
    //       // the naming can be any, depends on you.
    //       breakpoint: { max: 4000, min: 1024 },
    //       items: 5,
    //       slidesToSlide: 2,
    //     },
    //     desktop: {
    //       breakpoint: { max: 1024, min: 800 },
    //       items: 4,
    //     },
    //     tablet: {
    //       breakpoint: { max: 800, min: 464 },
    //       items: 2,
    //     },
    //     mobile: {
    //       breakpoint: { max: 464, min: 0 },
    //       items: 1,
    //     },
    //   };





    // for table with cards######################

    const numRows = Math.ceil(formTemplate.length / 3);
    const rows = Array.from({ length: numRows }, (_, i) => formTemplate.slice(i * 3, i * 3 + 3));





  return (
    
    <>
        {/* <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
        Toggle
        </button>
        <Transition
        //   as={Fragment}
          show={isShowing}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 rotate-[-120deg] scale-50"
          enterTo="opacity-100 rotate-0 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 rotate-0 scale-100 "
          leaveTo="opacity-0 scale-95 "
        > */}

        <Typography variant="h3" component="div" style={{ flexGrow: 1, margin: 30 }}>
            Add Form For Vendor
        </Typography>
        

        {/* FOR CAROUSEL
        <Carousel showDots={true} responsive={responsive}>
            {formTemplate}
        </Carousel> */}




      {/* For container showing forms that are selected */}
      <Fragment>
  <CssBaseline />
  <Container maxWidth="sm" style={{ backgroundColor:"#cfe8fc", borderRadius:"20px"}}>
    Selected Form(s)<br></br>
    {/* <Box sx={{ bgcolor: '#cfe8fc', height: '10vh' }} /> */}
    {selectedForm.map((item) => (
      <Chip label={item.name} />
    ))}
  </Container>
</Fragment>





        <br/>
        <br/>

        {/* FOR TABLE WITH CARDS */}
        <TableContainer style={{ maxHeight: 800 }}>
            <Table stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{textAlign: "center"}}>
                          
                            <Button style={{ backgroundColor: '#A5DEB8', height:50, width:250 }}>
                              <Typography variant="h10" style={{ fontFamily: 'Arial', color:'black' }}>
                                <AddIcon></AddIcon>
                                  Create Custom Form
                              </Typography>
                            </Button>
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
                                    {/* <Card>
                                        <CardContent>
                                            {item}
                                        </CardContent>
                                    </Card> */}
                                    <FormTemplate
                                              id = {item.id}
                                              name={item.name}
                                              url={item.imageurl}
                                              description={item.description}
                                              setSelectedForm={setSelectedForm}
                                              selectedForm={selectedForm}
                                              >
                                      {item}
                                    </FormTemplate>
                                </TableCell>
                            ))}
                            {/* Add empty cells to fill up the row if there are less than 3 items */}
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
        </TableContainer>






        <br/>
        <br/>
        
        <Button onClick={() => props.setActivePage('1')} style={{ backgroundColor: '#a8c7f7', color: 'inherit', margin: 100, height:50, width:150 }}>Back</Button>

        <Button onClick={() => props.setActivePage('3')} style={{ backgroundColor: '#a8c7f7', color: 'inherit', margin: 100,  height:50, width:150 }}>Next</Button>

        {/* </Transition> */}

    </>


  )
}



export default ProjectCreationPage2


