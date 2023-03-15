import React, { useEffect, useState } from 'react';
import { unmountComponentAtNode } from "react-dom";
import { Choices, FileUpload, LinearScale, TextInput } from './index.js';
import { TextField, Radio, IconButton, Button, InputLabel, Select, MenuItem, Box, FormControl, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { Dangerous } from '@mui/icons-material';

// TODO : create functions for move up, move down, delete
const Question = (props) => {
    const [questionType, setQuestionType] = useState('text');
    const [questionNum, setQuestionNum] = useState(0);
    const [questionTitle, setQuestionTitle] = useState('');

    function handleChangeQuestionType(value) {
        setQuestionType(value);
    }

    let to_update;
    function updateSpecialQues() { 
        if (questionType === "radio" || questionType === "checkbox" || questionType === "dropdown") {
            // this.setState({specialQuesSection: <Choices/>})
            to_update = <Choices questionType={questionType} questionNum={questionNum} choicesList={Array(0)}/>;
        } else if (questionType === "file") {
            to_update = <FileUpload />;
        } else if (questionType === "scale") {
            to_update = <LinearScale />;
        } else {
            let textInputValue = '';
            let textInputLabel = '';
            if (questionType === 'text') {
                textInputValue = 'Short text answer';
                textInputLabel = 'Short Text';

            } else {
                textInputValue = 'Paragraph answer';
                textInputLabel = 'Paragraph';
            }
            to_update = <TextInput value={textInputValue} label={textInputLabel} />;
        }
        return to_update;
    }

    return (
        
        <Card id={"Question" + props.questionNum} className='mb-2'>
            <div className="card-header d-flex justify-content-between align-items-center">
                <div className="d-flex w-75">
                    <TextField variant='standard' placeholder={`Question ${props.questionNum} Title`} onChange={(event) => setQuestionTitle(event.target.value)} fullWidth></TextField>
                </div>
                <IconButton color='error' onClick={() => props.handleDeleteQuestion("Question" + props.questionNum)}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <div className="card-body">
                <div className="form-group input-group mb-3">
                    <div className="my-auto me-3"> 
                        Question type:
                    </div>
                    <FormControl>
                        <Box>
                            <Select name="questionType" sx={{ height: '50px', width: 200, ms: '3' }} placeholder="text" value={questionType} onChange={(event) => handleChangeQuestionType(event.target.value)}>
                                <MenuItem value="text">Short text</MenuItem>
                                <MenuItem value="textarea">Paragraph</MenuItem>
                                <MenuItem value="radio">Multiple choice</MenuItem>
                                <MenuItem value="checkbox">Checkbox</MenuItem>
                                <MenuItem value="dropdown">Dropdown</MenuItem>
                                <MenuItem value="scale">Linear scale</MenuItem>
                                <MenuItem value="file">File upload</MenuItem>
                            </Select>
                        </Box>
                    </FormControl>
                </div>
                <div className="form-group input-group">
                    {updateSpecialQues()}
                </div>
            </div>
            <div className="card-footer d-flex">
                <div className="d-flex">
                    <div className="form-check form-switch me-5">
                        <input className="form-check-input" type="checkbox"></input>
                        <label className="form-check-label">Required</label>
                    </div>
                    {/* bernice create the javascript for conditional questions */}
                    {/* <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox"></input>
                        <label className="form-check-label">Conditional</label>
                    </div> */}
                </div>
            </div>
        </Card>
        
    )
}

export default Question;

{/* <div className="card mb-3" id={"Question" + props.questionNum}>
            <div className="card-header d-flex justify-content-between align-items-center">
                <div className="w-50">
                    <input type="text" className="form-control" value={questionTitle} onChange={(event) => setQuestionTitle(event.target.value)}></input>
                </div>
                <div className="d-flex">
                    <Button className="btn btn-light btn-rounded btn-sm ml-2 move_question_up">Move up</Button>
                    <Button className="btn btn-light btn-rounded btn-sm ml-2 move_question_down">Move down</Button>
                    <Button className="btn btn-danger btn-rounded btn-sm ml-2 delete_question">
                    <IconButton  ><DeleteIcon /></IconButton>
                    </Button>
                </div>
            </div>
            <div className="card-body">
                <div className="form-group input-group mb-3">
                    <label className="my-auto me-3">Question type: </label>
                    <div className="w-25">
                        <select name="questionType" className="form-select" onChange={(event) => handleChangeQuestionType(event.target.value)}>
                            <MenuItem value="text">Short text</MenuItem>
                            <MenuItem value="textarea">Paragraph</MenuItem>
                            <MenuItem value="radio">Multiple choice</MenuItem>
                            <MenuItem value="checkbox">Checkbox</MenuItem>
                            <MenuItem value="dropdown">Dropdown</MenuItem>
                            <MenuItem value="scale">Linear scale</MenuItem>
                            <MenuItem value="file">File upload</MenuItem>
                        </select>
                    </div>
                </div>
                <div className="form-group choices_section">
                    {specialQuesSection}
                </div>
            </div>
            <div className="card-footer d-flex">
                <div className="d-flex">
                    <div className="form-check form-switch me-5">
                        <input className="form-check-input" type="checkbox"></input>
                        <label className="form-check-label">Required</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox"></input>
                        <label className="form-check-label">Conditional</label>
                    </div>
                </div>
            </div>
        </div> */}