import React from "react";
import { Button } from '@mui/material'

export default function FormTemplate(props) {
  return (
    <div className="card">
      <img className="Form--image" src={props.url} alt="form image" />
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <p>
        <Button >Select Form</Button>
      </p>
    </div>
  );
}