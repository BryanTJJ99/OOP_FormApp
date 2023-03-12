import { React, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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



export default function FormTemplate(props) {


  function addForm(){
    
    if(buttonName == "Select Form"){
      setButtonName("Selected")
      setButtonStyle({ margin: "auto", width: 300, backgroundColor: "#cfe8fc", color:"blue" });
      props.setSelectedForm( prevSelectedForm => [...prevSelectedForm , {'id': props.id, 'name': props.name}]);
    }
    else{
      setButtonName("Select Form")
      setButtonStyle({ margin: "auto", width: 300, color: "blue" });
      // props.setSelectedForm(props.selectedForm.filter((id) => id !== props.id));
      props.setSelectedForm(prevSelectedForms => prevSelectedForms.filter(form => form.id !== props.id));
      
    }
  }

  const [buttonName, setButtonName] = useState("Select Form");
  const [buttonStyle, setButtonStyle] = useState({ margin: "auto", width: 300, color:"blue"})
  


  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button style={buttonStyle} onClick={addForm}>{buttonName}</Button> 
      </CardActions>
    </Card>
    {console.log(props.selectedForm)}
    </>
    
  );
}
