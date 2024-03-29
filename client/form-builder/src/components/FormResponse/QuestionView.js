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
        console.log(props.question.questionType)
        if (props.question.questionOrder in props.response.formAnswer && props.question.questionType === 'file') {
            setFile(props.response.formAnswer[props.question.questionOrder][0]);
            props.handleFileUpload(props.question.questionOrder, ['current', props.response.formAnswer[props.question.questionOrder][0], props.response.formAnswer[props.question.questionOrder][1]]);
        }
    }, [])

    const handleTextChange = (event) => { 
        setTextValue(event.target.value);
        props.handleChange(prev => [...prev, event.target.value]);
    }

    const handleRadioChange = (event) => {
        if (!props.disabled) { 
            setRadioValue(event.target.value);
        }
        props.handleChange(prev => [...prev, event.target.value]);
    }

    const handleCheckboxChange = (event) => {
        console.log(props)
        console.log(checkboxValue)
        let newCheckboxValue = [...checkboxValue];
        if (newCheckboxValue.includes(event.target.value)) {
            newCheckboxValue.splice(newCheckboxValue.indexOf(event.target.value), 1);
        } else {
            newCheckboxValue.push(event.target.value);
        }
        console.log(newCheckboxValue)
        setCheckboxValue(newCheckboxValue);
        props.handleChange(prev => [...prev, event.target.value]);
    }

    const handleRatingChange = (event) => {
        setRatingValue(event.target.value);
        props.handleChange(prev => [...prev, event.target.value]);
    }

    const handleDropdownChange = (event) => {
        setDropdownVal(event.target.value);
        console.log(event.target.value);
        props.handleChange(prev => [...prev, event.target.value]);
    };

    const handleFileChange = (newFile) => {
        setFile(newFile);
        props.handleFileUpload(props.question.questionOrder, newFile);
        props.handleChange(prev => [...prev, newFile]);
        //console.log(newFile);
        
        
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
            return <TextField name={props.question.questionOrder.toString()} variant='standard' placeholder="Your answer" value={textValue} onChange={handleTextChange} sx={{ width: '100%' }} disabled={props.disabled} required={props.required}></TextField>
        } else if (questionType === 'textarea') {
            return <TextField name={props.question.questionOrder.toString()} variant='standard' placeholder="Your answer" value={textValue} onChange={handleTextChange} sx={{ width: '100%' }} multiline rows={4} disabled={props.disabled} required={props.required}></TextField>
        } else if (questionType === 'radio') {
            let choices = Array(0);
            for (let i = 0; i < props.question.choices.length; i++) {
                choices.push(<FormControlLabel value={i} control={<Radio required={props.required}/>} label={props.question.choices[i]} onClick={handleRadioChange} disabled={props.disabled} />)
            }
            return (
                <FormControl sx={{ width: '100%' }}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name={props.question.questionOrder.toString()}
                        value={radioValue}
                        required={props.required}
                    >
                        {choices}
                    </RadioGroup>
                </FormControl>
            )
        } else if (questionType === 'checkbox') {
            let choices = Array(0);
            console.log(props.question.choices.length)
            for (let i = 0; i < props.question.choices.length; i++) {
                let checked = false;
                if (Object.keys(props.response.formAnswer).includes(props.question.questionOrder.toString())) {
                    if (Object.values(props.response.formAnswer[props.question.questionOrder]).includes(i.toString())) {
                        checked = true;
                    }
                }
            
                choices.push(<FormControlLabel value={i} control={<Checkbox defaultChecked={checked} />} label={props.question.choices[i]} onChange={handleCheckboxChange} disabled={props.disabled}/>)
            }
            return (
                <FormControl required={props.required}sx={{ width: '100%' }}>
                    <FormGroup >
                        {choices}
                    </FormGroup>
                    <input type="hidden" name={props.question.questionOrder.toString()} value={checkboxValue}></input>
                </FormControl>
            )
        } else if (questionType === 'dropdown') {
            let choices = Array(0);
            for (let i = 0; i < props.question.choices.length; i++) {
                choices.push(<MenuItem value={i}>{props.question.choices[i]}</MenuItem>)
            }
            return (
                <div className="w-50">
                    <FormControl fullWidth sx={{ textAlign: "start" }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={dropdownVal}
                            onChange={handleDropdownChange}
                            name={props.question.questionOrder.toString()}
                            disabled={props.disabled}
                            required={props.required}
                        >
                            <MenuItem value={"default"} disabled>Select an option</MenuItem>
                            {choices}
                        </Select>
                    </FormControl>
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
                    <Box width='15%' marginY={'auto'}>
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
                            icon={<CircleIcon  required={props.required} fontSize="inherit" sx={{ margin: '0.8rem' }} />}
                            emptyIcon={<RadioButtonUncheckedIcon required={props.required} fontSize="inherit" sx={{ margin: '0.8rem' }} />}
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
                    </Box>
                </div>
            )
        } else if (questionType === 'file') {
            let fileBase64Array = props.response.formAnswer[props.question.questionOrder];
            // var base64String = document.getElementById("Base64StringTxtBox").value;
            let fileElement = (<MuiFileInput onChange={handleFileChange} placeholder="Select a file" value={file} name={props.question.questionOrder.toString()} disabled={props.disabled} required={file?false:true}  />)
            // console.log(file)
            console.log(Object.keys(props.response.formAnswer), props.question.questionOrder)
            if (Object.keys(props.response.formAnswer).includes(props.question.questionOrder.toString())) {
                // const downloadLink = document.createElement("a");
                // downloadLink.href = fileBase64String;
                // downloadLink.download = "convertedPDFFile.pdf";
                // downloadLink.click();
                fileElement = (<div className='d-block'>
                    <MuiFileInput onChange={handleFileChange} label="Select a new file" value={file} sx={{ display: 'block', marginBottom: 2 }} hidden={props.disabled}/>
                    <Button component="a" href={"data:" + fileBase64Array[1] + ";base64," + fileBase64Array[0]} download="userInputFile" variant="contained" sx={{ padding: 2, display: 'block' }}><AttachFileIcon sx={{ marginRight: 1 }} />Download Submitted File</Button>
                </div>)
            }
            return (
                <div className='d-flex'>
                    {fileElement}
                </div>)
        }
    }

    return (
        <Card variant="outlined" className="mx-5 mb-3">
            <div className='card-header text-left'>
                {props.question.questionTitle}
                <Box component='span' color='primary.main'>{props.question.isRequired ? " *" : ""}</Box>
            </div>
            <div className='card-body'>
                {specialQuestionType(props.question.questionType)}
            </div>
        </Card>
    )
}

export default QuestionView;