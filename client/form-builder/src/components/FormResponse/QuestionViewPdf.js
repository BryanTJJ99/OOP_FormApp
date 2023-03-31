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
        console.log(event.target.value);
    };

    const handleFileChange = (newFile) => {
        setFile(newFile);
        props.handleFileUpload(props.question.questionOrder, newFile);
        console.log(newFile);
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
            return <input type='text' placeholder='Your answer' value={textValue} className='w-100'></input>
            // return <TextField name={props.question.questionOrder.toString()} variant='standard' placeholder="Your answer" value={textValue} onChange={(e) => { setTextValue(e.target.value) }} sx={{ width: '100%' }} disabled={props.disabled} required={props.required}></TextField>
        } else if (questionType === 'textarea') {
            return <input type='textarea' placeholder='Your answer' value={textValue} className='w-100'></input>
            // return <TextField name={props.question.questionOrder.toString()} variant='standard' placeholder="Your answer" value={textValue} onChange={(e) => { setTextValue(e.target.value) }} sx={{ width: '100%' }} multiline rows={4} disabled={props.disabled} required={props.required}></TextField>
        } else if (questionType === 'radio' || questionType === 'dropdown') {
            let choices = Array(0);
            for (let i = 0; i < props.question.choices.length; i++) {
                if (i === parseInt(props.response.formAnswer[props.question.questionOrder])) { 
                    choices.push(<div><label className='d-block w-100'><input type='radio' checked></input>&nbsp;{props.question.choices[i]}</label></div>)
                } else { 
                    choices.push(<div><label className='d-block w-100'><input type='radio'></input>&nbsp;{props.question.choices[i]}</label></div>)
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
                console.log(Object.keys(props.response.formAnswer),)
                if (Object.keys(props.response.formAnswer).includes(props.question.questionOrder.toString())) {
                    if (Object.values(props.response.formAnswer[props.question.questionOrder]).includes(i.toString())) {
                        // checked = true;
                        choices.push(<div><label className='d-block w-100'><input type='checkbox' checked></input>&nbsp;{props.question.choices[i]}</label></div>)

                    } else { 
                        choices.push(<div><label className='d-block w-100'><input type='checkbox'></input>&nbsp;{props.question.choices[i]}</label></div>)
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
            return (
                <div className='d-flex'>
                    {ratingValue} on a scale of {minVal + " (" + minLabel + ")"} to {maxVal + " (" + maxLabel + ")"} 
                    {/* <Box width='15%' marginY={'auto'}>
                        <Typography component="legend">{minVal}</Typography>
                        <Typography component="legend">{minLabel}</Typography>
                    </Box>
                    <Box width={'70%'}>
                        <StyledRating
                            name={props.question.questionOrder.toString()}
                            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            // use max to set the number of circles
                            max={numberOfNodes}
                            icon={<CircleIcon fontSize="inherit" sx={{ margin: '0.8rem' }} />}
                            emptyIcon={<RadioButtonUncheckedIcon fontSize="inherit" sx={{ margin: '0.8rem' }} />}
                            width='70%'
                            value={ratingValue}
                            onChange={handleRatingChange}
                            disabled={props.disabled}
                            required={props.required}
                        />
                    </Box>
                    <Box width='15%' marginY={'auto'}>
                        <Typography component="legend">{maxVal}</Typography>
                        <Typography component="legend">{maxLabel}</Typography>
                    </Box> */}
                </div>
            )   
        } else if (questionType === 'file') {
            let fileBase64Array = props.response.formAnswer[props.question.questionOrder];
            // var base64String = document.getElementById("Base64StringTxtBox").value;
            let fileElement = (<input type='file'></input>)
            // let fileElement = (<MuiFileInput onChange={handleFileChange} placeholder="Select a file" value={file} name={props.question.questionOrder.toString()} disabled={props.disabled} required={props.required}/>)
            console.log(Object.keys(props.response.formAnswer), props.question.questionOrder)
            if (Object.keys(props.response.formAnswer).includes(props.question.questionOrder.toString())) {
                // const downloadLink = document.createElement("a");
                // downloadLink.href = fileBase64String;
                // downloadLink.download = "convertedPDFFile.pdf";
                // downloadLink.click();
                fileElement = (<div className='d-inline'>
                    <div className='mb-2'>
                        <label>Select new file:&nbsp;<input type='file'></input></label>
                    </div>
                    <div className='d-flex'>
                        <a href={"data:" + fileBase64Array[1] + ";base64," + fileBase64Array[0]} download="userInputFile" variant="contained" className="align-left ms-0">Download Submitted File</a>
                    </div>
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
                Q: {props.question.questionTitle}
                <span color='primary.main'>{props.question.isRequired ? " *" : ""}</span>
            </div>
            <div>
                {specialQuestionType(props.question.questionType)}
            </div>
        </div>
    )
}

export default QuestionView;