import { React, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// export default function FormTemplate(props) {
//   return (
//     <div className="card">
//       <img className="Form--image" src={props.url} alt="form image" />
//       <h2>{props.name}</h2>
//       <p>{props.description}</p>
//       <p>
//         <Button >Select Form</Button>
//       </p>
//     </div>
//   );

export default function EditProjectFormTemplateCard(props) {
    const addForm = (form) => {
        console.log(form);
        props.handleFormTemplateSelectionChange(form);
    };

    const isInSelectedForm = props.selectedForms.some(
        (form) => form.id === props.id
    );
    const buttonName = isInSelectedForm ? "Selected" : "Select Form";
    const buttonStyle = isInSelectedForm
        ? {
              margin: "auto",
              width: 150,
              backgroundColor: "#cfe8fc",
              color: "#1F87BC",
          }
        : { margin: "auto", width: 150, color: "#1F87BC" };

    return (
        <>
            {/* {console.log(props.projectData)} */}
            <Card sx={{ maxWidth: 345 }}>
                {/* <CardMedia
        sx={{ height: 140 }}
        image={props.url}
      /> */}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        style={buttonStyle}
                        onClick={() =>
                            addForm({ id: props.id, name: props.name })
                        }
                    >
                        {buttonName}
                    </Button>
                </CardActions>
            </Card>
            {console.log(props.selectedForms)}
        </>
    );
}
