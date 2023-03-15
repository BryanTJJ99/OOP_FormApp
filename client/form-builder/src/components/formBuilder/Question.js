import React, { useEffect, useState } from 'react';
import { Choices, FileUpload, LinearScale, TextInput } from './index.js';
import { TextField, Radio, IconButton, Button, InputLabel, Select, MenuItem, Box, FormControl } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { Dangerous } from '@mui/icons-material';

// TODO : create functions for move up, move down, delete
const Question = (props) => {
    const [questionType, setQuestionType] = useState('text');
    const [questionNum, setQuestionNum] = useState(0);
    const [specialQuesSection, setSpecialQuesSection] = useState(0);
    const [questionTitle, setQuestionTitle] = useState('');

    function handleChangeQuestionType(value) {
        setQuestionType(value);
    }

    let to_update;
    useEffect(() => {
        setSpecialQuesSection(0);
        if (questionType === "radio" || questionType === "checkbox" || questionType === "dropdown") {
            // this.setState({specialQuesSection: <Choices/>})
            to_update = <Choices questionType={questionType} questionNum={questionNum} />;
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
        setSpecialQuesSection(to_update);
    }, [questionType])

    return (
        
        <div className="card mb-2 w-100" id={"Question" + props.questionNum}>
            <div className="card-header d-flex justify-content-between align-items-center">
                <div className="w-50">
                    {/* ken update the input to TextInput from MUI */}
                    <input type="text" className="form-control" value={questionTitle} placeholder={`Question ${props.questionNum} Title`} onChange={(event) => setQuestionTitle(event.target.value)}></input>
                </div>
                <div className="d-flex">
                    {/* bernice create the javascript for the move up and move down buttons */}
                    <Button color='secondary'>Move up</Button>
                    <Button color='secondary'>Move down</Button>
                    <Button >
                        <IconButton  ><DeleteIcon color='danger' /></IconButton>
                    </Button>
                </div>
            </div>
            <div className="card-body">
                <div className="form-group input-group mb-3">
                    Question type:
                    <FormControl>
                        <Box sx={{ width: '25%' }}>
                            <Select name="questionType" sx={{ height: '50px', ms: '3' }} placeholder="text" value={questionType} onChange={(event) => handleChangeQuestionType(event.target.value)}>
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
                    {/* bernice create the javascript for conditional questions */}
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox"></input>
                        <label className="form-check-label">Conditional</label>
                    </div>
                </div>
            </div>
        </div>
        
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