import React, { useEffect, useState } from 'react';
import { Question, Section } from './index.js';
import StickyBox from "react-sticky-box";
import { Button, Stack, IconButton } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


const QuestionsSection = (props) => {
    const [questionArea, setQuestionArea] = useState(Array(0));
    const [sectionNumber, setSectionNumber] = useState(1);
    const [questionNumber, setQuestionNumber] = useState(1);

    function handleAddSection() {
        let newSectionNumber = sectionNumber + 1;
        setSectionNumber(newSectionNumber);
        let newQuestionArea = [...questionArea, <Section sectionNum={sectionNumber} key={'Section' + sectionNumber} />];
        setQuestionArea(newQuestionArea);
    }

    function handleAddQuestion() {
        let newQuestionNumber = questionNumber + 1;
        setQuestionNumber(newQuestionNumber);
        let newQuestionArea = [...questionArea, <Question questionNum={questionNumber} key={'Question' + questionNumber} />];
        setQuestionArea(newQuestionArea);
    }

    useEffect(() => {
        let newQuestionArea = [<Section sectionNum={sectionNumber} key={'Section' + sectionNumber} />, <Question questionNum={questionNumber} key={'Question' + questionNumber} />];
        let newSectionNumber = sectionNumber + 1;
        setSectionNumber(newSectionNumber);
        let newQuestionNumber = questionNumber + 1;
        setQuestionNumber(newQuestionNumber);
        setQuestionArea(newQuestionArea);
    }, [])

    return (
        <div className="d-flex align-items-start mt-3 w-75 mx-auto">
            <StickyBox>
                <div className="ms-3 bg-light rounded mt-4 p-3">
                    <Stack>
                        <Button sx={{borderRadius:'10%'}}>
                        <IconButton variant='contained' sx={{ bgcolor: 'primary' }} onClick={() => handleAddSection()}><PostAddIcon /></IconButton>
                        </Button>
                        <Button sx={{borderRadius:'10%',mt:1}}>
                        <IconButton variant='contained'  onClick={() => handleAddQuestion()}><AddCircleOutlineOutlinedIcon /></IconButton>
                        </Button>
                    </Stack>
                </div>
            </StickyBox>
            <div className="w-100 ms-3">
                {questionArea}
            </div>
        </div>
    )
}

export default QuestionsSection;