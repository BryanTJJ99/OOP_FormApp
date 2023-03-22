import React, { useEffect, useState } from 'react';
import { Typography, Card, TextField, FormControl, FormGroup, RadioGroup, FormControlLabel, Radio, Checkbox, Select, MenuItem, styled, Rating, Box, Button } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import { MuiFileInput } from 'mui-file-input'
import AttachFileIcon from '@mui/icons-material/AttachFile';

const QuestionView = (props) => {
    const [dropdownVal, setDropdownVal] = useState("default");
    const [file, setFile] = useState(null);

    const handleDropdownChange = (event) => {
        setDropdownVal(event.target.value);
        console.log(event.target.value);
    };

    const handleFileChange = (newFile) => {
        setFile(newFile);
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
            return <TextField variant='standard' placeholder="Your answer" value={props.response.formAnswer[props.question.questionOrder]} sx={{width: '100%'}} disabled></TextField>
        } else if (questionType === 'textarea') { 
            return <TextField variant='standard' placeholder="Your answer" value={props.response.formAnswer[props.question.questionOrder]} sx={{width: '100%'}} multiline rows={4} disabled></TextField>
        } else if (questionType === 'radio') { 
            let choices = Array(0);
            for (let i=0; i<props.question.choices.length; i++) { 
                let checked = false; 
                if (props.response.formAnswer[props.question.questionOrder] === i.toString()) { 
                    checked = true; 
                }
                choices.push(<FormControlLabel value={i} control={<Radio />} label={props.question.choices[i]} disabled checked={checked} />)
            }
            return (
                <FormControl sx={{width: '100%'}}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        // value={props.response.formAnswer[props.question.questionOrder]}
                    >
                        {choices}
                    </RadioGroup>
                </FormControl>
            )
        } else if (questionType === 'checkbox') { 
            let choices = Array(0);
            for (let i=0; i<props.question.choices.length; i++) { 
                let checked = false;
                console.log(Object.keys(props.response.formAnswer), )
                if (Object.keys(props.response.formAnswer).includes(props.question.questionOrder.toString())) { 
                    if (Object.values(props.response.formAnswer[props.question.questionOrder]).includes(i.toString())) { 
                        checked = true; 
                    }
                }
                choices.push(<FormControlLabel value={i} control={<Checkbox />} label={props.question.choices[i]} disabled checked={checked} />)
            }
            return (
                <FormControl sx={{width: '100%'}}>
                    <FormGroup>
                        {choices}
                    </FormGroup>
                </FormControl>
            )
        } else if (questionType === 'dropdown') { 
            let choices = Array(0);
            for (let i=0; i<props.question.choices.length; i++) { 
                choices.push(<MenuItem value={i} disabled>{props.question.choices[i]}</MenuItem>)
            }
            return ( 
                <div className="w-50"> 
                    <FormControl fullWidth sx={{textAlign:"start"}}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleDropdownChange}
                            value={props.response.formAnswer[props.question.questionOrder]}
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
                            name="customized-color"
                            // defaultValue={null}
                            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            // use max to set the number of circles
                            max={numberOfNodes}
                            icon={<CircleIcon fontSize="inherit" sx={{margin: '0.8rem'}}/>}
                            emptyIcon={<RadioButtonUncheckedIcon fontSize="inherit" sx={{margin: '0.8rem'}} />}
                            width='70%'
                            disabled
                            defaultValue={parseInt(props.response.formAnswer[props.question.questionOrder])}
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
            let fileElement = (<MuiFileInput onChange={handleFileChange} placeholder="Select a file" disabled value={file}/>)
            console.log(Object.keys(props.response.formAnswer), props.question.questionOrder)
            if (Object.keys(props.response.formAnswer).includes(props.question.questionOrder.toString())) { 
                // const downloadLink = document.createElement("a");
                // downloadLink.href = fileBase64String;
                // downloadLink.download = "convertedPDFFile.pdf";
                // downloadLink.click();
                fileElement = (<Button component="a" href={"data:"+fileBase64Array[1]+";base64," + fileBase64Array[0]} download="userInputFile" variant="outlined" sx={{padding:2}}><AttachFileIcon sx={{marginRight:1}}/>Download Submitted File</Button>)
            }
            return (
                <div className='d-flex'>
                    {fileElement}
                </div>)
        }
    }

    function controlFileElement() { 

    }

    return (
        <Card variant="outlined" className="mx-5 mb-3">
            <div className='card-header text-left'>
                {props.question.questionTitle}
            </div>
            <div className='card-body'>
                {specialQuestionType(props.question.questionType)}
            </div>
        </Card>
    )
}

export default QuestionView;