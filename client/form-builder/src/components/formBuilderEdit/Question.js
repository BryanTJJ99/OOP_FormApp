import React, { useEffect, useState } from 'react';
import { unmountComponentAtNode } from "react-dom";
import { Choices, FileUpload, LinearScale, TextInput } from './index.js';
import { TextField, Radio, IconButton, Button, InputLabel, Select, MenuItem, Box, FormControl, Card, Switch, FormControlLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { Dangerous } from '@mui/icons-material';

// TODO : create functions for move up, move down, delete
const Question = (props) => {
    const [questionType, setQuestionType] = useState('text');
    const [questionNum, setQuestionNum] = useState(0);
    const [questionTitle, setQuestionTitle] = useState('');
    const [isRequired, setIsRequired] = useState(true); 

    function handleChangeQuestionType(value) {
        setQuestionType(value);
    }

    useEffect(() => {
        if (props.questionInput !== '') { 
            console.log(props.questionInput)
            setQuestionType(props.questionInput.questionType); 
            setQuestionTitle(props.questionInput.questionTitle);
            setIsRequired(props.questionInput.isRequired); 
            console.log(props.questionInput.isRequired)
        }
    }, [])

    let to_update;
    function updateSpecialQues() { 
        if (questionType === "radio" || questionType === "checkbox" || questionType === "dropdown") {
            // this.setState({specialQuesSection: <Choices/>})
            to_update = <Choices key={"Question" + props.questionNum + questionType} questionType={questionType} questionNum={questionNum} questionId={"Question" + props.questionNum} choicesList={props.questionInput.choices}/>;
        } else if (questionType === "file") {
            to_update = <FileUpload />;
        } else if (questionType === "scale") {
            to_update = <LinearScale questionId={"Question" + props.questionNum} scaleInput={props.questionInput}/>;
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
                    <TextField name={"Question" + props.questionNum + 'questionTitle'} variant='standard' placeholder={`Question ${props.questionNum} Title`} onChange={(event) => setQuestionTitle(event.target.value)} value={questionTitle} fullWidth required></TextField>
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
                    <FormControl sx={{textAlign:"start"}}>
                        <Box>
                            <Select name={"Question" + props.questionNum + 'questionType'} sx={{ height: '50px', width: 200, ms: '3' }} placeholder="text" value={questionType} onChange={(event) => handleChangeQuestionType(event.target.value)}>
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
                    <FormControlLabel name={"Question" + props.questionNum + 'isRequired'} value={props.questionInput.isRequired} control={<Switch defaultChecked={props.questionInput.isRequired} />} label="Required" />
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