import React, { useEffect, useState } from 'react';
import { Typography, Card, TextField, FormControl, FormGroup, RadioGroup, FormControlLabel, Radio, Checkbox, Select, MenuItem, styled, Rating, Box } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import { MuiFileInput } from 'mui-file-input'

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
            return <TextField variant='standard' placeholder="Your answer" sx={{width: '100%'}}></TextField>
        } else if (questionType === 'textarea') { 
            return <TextField variant='standard' placeholder="Your answer" sx={{width: '100%'}} multiline rows={4}></TextField>
        } else if (questionType === 'radio') { 
            let choices = Array(0);
            for (let i=0; i<props.question.choices.length; i++) { 
                choices.push(<FormControlLabel value={i} control={<Radio />} label={props.question.choices[i]} />)
            }
            return (
                <FormControl sx={{width: '100%'}}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        {choices}
                    </RadioGroup>
                </FormControl>
            )
        } else if (questionType === 'checkbox') { 
            let choices = Array(0);
            for (let i=0; i<props.question.choices.length; i++) { 
                choices.push(<FormControlLabel value={i} control={<Checkbox />} label={props.question.choices[i]} />)
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
                choices.push(<MenuItem value={i}>{props.question.choices[i]}</MenuItem>)
            }
            return ( 
                <div className="w-50"> 
                    <FormControl fullWidth sx={{textAlign:"start"}}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={dropdownVal}
                            onChange={handleDropdownChange}
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
                            defaultValue={null}
                            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            // use max to set the number of circles
                            max={numberOfNodes}
                            icon={<CircleIcon fontSize="inherit" sx={{margin: '0.8rem'}}/>}
                            emptyIcon={<RadioButtonUncheckedIcon fontSize="inherit" sx={{margin: '0.8rem'}} />}
                            width='70%'
                        />
                    </Box>
                    <Box width='15%' marginY={'auto'}>
                        <Typography component="legend">{maxVal}</Typography>
                        <Typography component="legend">{maxLabel}</Typography>
                    </Box>
                </div>
            )
        } else if (questionType === 'file') { 
            return (
                <div className='d-flex'>
                    <MuiFileInput value={file} onChange={handleFileChange} placeholder="Select a file"/>
                </div>)
        }
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