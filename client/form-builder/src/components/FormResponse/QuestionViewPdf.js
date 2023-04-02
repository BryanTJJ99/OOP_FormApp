import React, { useEffect, useState } from 'react';
import { Typography, Card, TextField, FormControl, FormGroup, RadioGroup, FormControlLabel, Radio, Checkbox, Select, MenuItem, styled, Rating, Box, Button } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import { MuiFileInput } from 'mui-file-input'
import AttachFileIcon from '@mui/icons-material/AttachFile';

const QuestionView = (props) => {
    const [dropdownVal, setDropdownVal] = useState(props.response.formAnswer[props.question.questionOrder]);
    const [file, setFile] = useState(null);
    const [radioValue, setRadioValue] = useState(props.response.formAnswer[props.question.questionOrder]);
    const [checkboxValue, setCheckboxValue] = useState(props.response.formAnswer[props.question.questionOrder]);
    const [ratingValue, setRatingValue] = useState(parseInt(props.response.formAnswer[props.question.questionOrder]));
    const [textValue, setTextValue] = useState(props.response.formAnswer[props.question.questionOrder]);

    useEffect(() => {
        if (props.question.questionOrder in props.response.formAnswer) {
            setFile(props.response.formAnswer[props.question.questionOrder][0]);
            props.handleFileUpload(props.question.questionOrder, ['current', props.response.formAnswer[props.question.questionOrder][0], props.response.formAnswer[props.question.questionOrder][1]]);
        }
    }, [])

    const handleRadioChange = (event) => {
        if (!props.disabled) { 
            setRadioValue(event.target.value);
        }
    }

    const handleCheckboxChange = (event) => {
        let newCheckboxValue = [...checkboxValue];
        if (newCheckboxValue.includes(event.target.value)) {
            newCheckboxValue.splice(newCheckboxValue.indexOf(event.target.value), 1);
        } else {
            newCheckboxValue.push(event.target.value);
        }
        setCheckboxValue(newCheckboxValue);
    }

    const handleRatingChange = (event) => {
        setRatingValue(event.target.value)
    }

    const handleDropdownChange = (event) => {
        setDropdownVal(event.target.value);
    };

    const handleFileChange = (newFile) => {
        setFile(newFile);
        props.handleFileUpload(props.question.questionOrder, newFile);
    };

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#1F87BC',
        },
        '& .MuiRating-iconHover': {
            color: '#1F87BC',
        },
    });

    function specialQuestionType(questionType) {
        if (questionType === 'text') {
            return <span>{textValue}</span>
            // return <TextField name={props.question.questionOrder.toString()} variant='standard' placeholder="Your answer" value={textValue} onChange={(e) => { setTextValue(e.target.value) }} sx={{ width: '100%' }} disabled={props.disabled} required={props.required}></TextField>
        } else if (questionType === 'textarea') {
            return <span>{textValue}</span>
            // return <TextField name={props.question.questionOrder.toString()} variant='standard' placeholder="Your answer" value={textValue} onChange={(e) => { setTextValue(e.target.value) }} sx={{ width: '100%' }} multiline rows={4} disabled={props.disabled} required={props.required}></TextField>
        } else if (questionType === 'radio' || questionType === 'dropdown') {
            let choices = Array(0);
            for (let i = 0; i < props.question.choices.length; i++) {
                if (i === parseInt(props.response.formAnswer[props.question.questionOrder])) { 
                    choices.push(<div><label className='d-block w-100'><span>[X] </span>{props.question.choices[i]}</label></div>)
                } else { 
                    choices.push(<div><label className='d-block w-100'><span>[&nbsp;&nbsp;] </span>{props.question.choices[i]}</label></div>)
                }
                // choices.push(<FormControlLabel value={i} control={<Radio />} label={props.question.choices[i]} onClick={handleRadioChange} disabled={props.disabled}/>)
            }
            return (
                <div className='text-left'>
                    <div
                        aria-labelledby="demo-radio-buttons-group-label"
                        name={props.question.questionOrder.toString()}
                        value={radioValue}
                        required={props.required}
         
                    >
                        {choices}
                    </div>
                </div>
            )
        } else if (questionType === 'checkbox') {
            let choices = Array(0);
            for (let i = 0; i < props.question.choices.length; i++) {
                // let checked = false;
                if (Object.keys(props.response.formAnswer).includes(props.question.questionOrder.toString())) {
                    if (Object.values(props.response.formAnswer[props.question.questionOrder]).includes(i.toString())) {
                        // checked = true;
                        choices.push(<div><label className='d-block w-100'><span>[X] </span>{props.question.choices[i]}</label></div>)

                    } else { 
                        choices.push(<div><label className='d-block w-100'><span>[&nbsp;&nbsp;] </span>{props.question.choices[i]}</label></div>)
                    }
                }
                // choices.push(<FormControlLabel value={i} control={<Checkbox defaultChecked={checked} />} label={props.question.choices[i]} onChange={handleCheckboxChange} disabled={props.disabled}/>)
            }
            return (
                <div sx={{ width: '100%' }} className='text-left'>
                    <div required={props.required} >
                        {choices}
                    </div>
                    <input type="hidden" name={props.question.questionOrder.toString()} value={checkboxValue}></input>
                </div>
            )
        } else if (questionType === 'scale') {
            let minVal = parseInt(props.question.minValue);
            let minLabel = props.question.minLabel;
            let maxVal = parseInt(props.question.maxValue);
            let maxLabel = props.question.maxLabel;
            let numberOfNodes = maxVal - minVal + 1;
            if (ratingValue) { 
                return (
                    <div className='d-flex'>
                        {ratingValue} on a scale of {minVal + " (" + minLabel + ")"} to {maxVal + " (" + maxLabel + ")"} 
                    </div>
                )   
            } else { 
                return (
                    <div className='d-flex'>
                        Question has not been answered.
                    </div>
                )   
            }
            
        } else if (questionType === 'file') {
            let fileBase64Array = props.response.formAnswer[props.question.questionOrder];
            // var base64String = document.getElementById("Base64StringTxtBox").value;
            let fileElement = (
                <div className='mb-2'>
                    Respondent has not submitted a file
                </div>)
            // let fileElement = (<MuiFileInput onChange={handleFileChange} placeholder="Select a file" value={file} name={props.question.questionOrder.toString()} disabled={props.disabled} required={props.required}/>)
            if (Object.keys(props.response.formAnswer).includes(props.question.questionOrder.toString())) {
                // const downloadLink = document.createElement("a");
                // downloadLink.href = fileBase64String;
                // downloadLink.download = "convertedPDFFile.pdf";
                // downloadLink.click();
                fileElement = (
                    <div className='d-inline'>
                        Respondent has submitted a file
                    </div>)
            }
            return (
                <div className='d-flex'>
                    {fileElement}
                </div>)
        }
    }

    return (
        <div className="mx-5 mb-4">
            <div className='text-left fw-bolder'>
                <b>Q{props.question.questionOrder}: {props.question.questionTitle}</b>
                <span color='primary.main'>{props.question.isRequired ? " *" : ""}</span>
            </div>
            <div>
                {specialQuestionType(props.question.questionType)}
            </div>
            <br></br><br></br>
        </div>
    )
}

export default QuestionView;