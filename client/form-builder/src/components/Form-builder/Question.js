import React, { useEffect, useState } from 'react';
import { Choices, FileUpload, LinearScale, TextInput } from './index.js';

const Question = (props) => { 
    const [questionType, setQuestionType] = useState('text');
    const [questionNum, setQuestionNum] = useState(0);
    const [showOption, setShowOption] = useState('text'); 
    const [specialQuesSection, setSpecialQuesSection] = useState(0);
    const [questionTitle, setQuestionTitle] = useState(`Question ${props.questionNum} Title`);

    function handleChangeQuestionType(value) {
        if (value === 'radio' || value === 'checkbox' || value === 'dropdown') {
            setShowOption("choice" );
        } else if (value === 'file') {
            setShowOption("file");
        } else if (value === 'scale') {
            setShowOption("scale" );
        } else {
            setShowOption("text");
        }
        setQuestionType(value);
    }

    let to_update; 
    useEffect(() => { 
        if (showOption === "choice") {
            // this.setState({specialQuesSection: <Choices/>})
            to_update = <Choices questionType={questionType} questionNum={questionNum}/>;
        } else if (showOption === "file") {
            to_update = <FileUpload />;
        } else if (showOption === "scale") {
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
            to_update = <TextInput value={textInputValue} label = {textInputLabel} />;
        }
        setSpecialQuesSection(to_update); 
    }, [showOption])
    
    return (
        <div className="card mb-3" id={"Question" + props.questionNum}>
            <div className="card-header d-flex justify-content-between align-items-center">
                <div className="w-50">
                    <input type="text" className="form-control" value={questionTitle} onChange={(event) => setQuestionTitle(event.target.value)}></input>
                </div>
                <div className="d-flex">
                    <button className="btn btn-light btn-rounded btn-sm ml-2 move_question_up">Move up</button>
                    <button className="btn btn-light btn-rounded btn-sm ml-2 move_question_down">Move down</button>
                    <button className="btn btn-danger btn-rounded btn-sm ml-2 delete_question">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="card-body">
                <div className="form-group input-group mb-3">
                    <label className="my-auto me-3">Question type: </label>
                    <div className="w-25">
                        <select name="questionType" className="form-select" onChange={(event) => handleChangeQuestionType(event.target.value)}>
                            <option value="text">Short text</option>
                            <option value="textarea">Paragraph</option>
                            <option value="radio">Multiple choice</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="dropdown">Dropdown</option>
                            <option value="scale">Linear scale</option>
                            <option value="file">File upload</option>
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
        </div>
    )
}

export default Question;