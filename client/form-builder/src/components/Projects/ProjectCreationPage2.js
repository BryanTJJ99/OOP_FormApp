import React from 'react' //rafce 
import { Button, Typography } from '@mui/material'
import FormTemplate from "./FormTemplate";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./ProjectCreationPage2.css";

//Imports for material table with cards
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
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

      const formTemplate = formTemplateData.map((item) => (
        <FormTemplate
          name={item.name}
          url={item.imageurl}
          description={item.description}

        />
      ));





    //For Carousell###################
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1024 },
          items: 5,
          slidesToSlide: 2,
        },
        desktop: {
          breakpoint: { max: 1024, min: 800 },
          items: 4,
        },
        tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };





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

        <Typography variant="h6" component="div" style={{ flexGrow: 1, margin: 30 }}>
            Add Form For Vendor
        </Typography>
        

        {/* FOR CAROUSEL */}
        <Carousel showDots={true} responsive={responsive}>
            {formTemplate}
        </Carousel>


        <br/>
        <br/>


        {/* FOR TABLE WITH CARDS */}
        <TableContainer style={{ maxHeight: 800 }}>
            <Table stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        <TableCell>Select Form Templates For Vendor</TableCell>
                        <TableCell>
                            <Button style={{ backgroundColor: '#a8c7f7', color: 'inherit', height:50, width:150 }}>Create Custom Form</Button>
                            </TableCell>
                        <TableCell>Select Form Templates For Vendor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((item, columnIndex) => (
                                <TableCell key={columnIndex}>
                                    <Card>
                                        <CardContent>
                                        {/* <   Typography variant="h5">{item.title}</Typography>
                                            <Typography variant="body2">{item.description}</Typography> */}
                                            {item}
                                        </CardContent>
                                    </Card>
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


