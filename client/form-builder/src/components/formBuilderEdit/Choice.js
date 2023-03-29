import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette, spacing } from '@mui/system';
import { TextField, Radio, IconButton, Checkbox, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'; 

const Choice = (props, handleDeleteChoice) => {
    const [icon, setIcon] = useState(null);
    const [choiceText, setChoiceText] = useState(''); 

    useEffect(() => {
        if (props.type === 'radio') {
            setIcon(<Radio disabled />);
        } else if (props.type === 'checkbox') { 
            setIcon(<Checkbox disabled />);
        } else { 
            setIcon(<Checkbox disabled icon={<ArrowDropDownCircleIcon />} />);
        }
        console.log(props.choiceInput)
        setChoiceText(props.choiceInput);
    }, [props.type])

    function updateChoiceText(e) { 
        let newChoiceText = e.target.value; 
        setChoiceText(newChoiceText); 
        props.updateChoiceLabel(props.choiceId, e.target.value);
    } 

    return (
        <div id={props.choiceId} className="input-group d-flex mb-3 choice" >
            {icon}
            <TextField name={props.choiceId} value={choiceText} className="mb-3 w-75" variant='standard' label="" placeholder={'Option ' + Number(props.choiceNum+1)} onChange={updateChoiceText} required></TextField>
            <IconButton color='error' onClick={() => props.handleDeleteChoice(props.choiceNum)} ><DeleteIcon /></IconButton>
        </div>
    )

}

export default Choice;

// {/* <div id={'Question' + props.questionNum + 'Choice' + props.choiceNum} className="input-group d-flex mb-3 choice" >
// <div className="form-check">
// <input type={props.type} className="form-check-input py-auto"></input>
// </div>
// <TextField variant='standard' label={'Option ' + Number(props.choiceNum+1)} >
// <input type='text' className="form-control w-50" placeholder={`Option ${props.choiceNum + 1}`}></input>
// </TextField>
// <div className="deleteButton ms-4">
// <button className="btn btn-transparent btn-rounded btn-sm ml-2 delete_question" onClick={() => props.handleDeleteChoice(props.choiceNum)}>
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#df4759" className="bi bi-trash3-fill" viewBox="0 0 16 16">
//         <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
//     </svg>
// </button>
// </div>
// </div> */}