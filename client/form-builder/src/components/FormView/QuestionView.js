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
            return (
                <FormControl sx={{width: '100%'}}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
            )
        } else if (questionType === 'checkbox') { 
            return (
                <FormControl sx={{width: '100%'}}>
                    <FormGroup>
                        <FormControlLabel value="female" control={<Checkbox />} label="Female" />
                        <FormControlLabel value="male" control={<Checkbox />} label="Male" />
                        <FormControlLabel value="other" control={<Checkbox />} label="Other" />
                    </FormGroup>
                </FormControl>
            )
        } else if (questionType === 'dropdown') { 
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
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            )
        } else if (questionType === 'scale') { 
            return ( 
                <div className='d-flex'> 
                    <Typography component="legend" marginY={'auto'} width='15%'>Min Label</Typography>
                    <Box width={'70%'}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={null}
                            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            // use max to set the number of circles
                            max={10}
                            icon={<CircleIcon fontSize="inherit" sx={{margin: '0.8rem'}}/>}
                            emptyIcon={<RadioButtonUncheckedIcon fontSize="inherit" sx={{margin: '0.8rem'}} />}
                            width='70%'
                        />
                    </Box>
                    <Typography component="legend" marginY={'auto'} width='15%'>Max Label</Typography>
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
                Question Title for {props.questionType}
            </div>
            <div className='card-body'>
                {specialQuestionType(props.questionType)}
            </div>
        </Card>
    )
}

export default QuestionView;