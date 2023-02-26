import React, { useEffect, useState } from 'react';
import { Question, Section } from './index.js';
import StickyBox from "react-sticky-box";

const QuestionsSection = (props) => { 
    const [questionArea, setQuestionArea] = useState(Array(0)); 
    const [sectionNumber, setSectionNumber] = useState(1);
    const [questionNumber, setQuestionNumber] = useState(1);

    function handleAddSection() { 
        let newSectionNumber = sectionNumber + 1; 
        setSectionNumber(newSectionNumber); 
        let newQuestionArea = [...questionArea, <Section sectionNum={sectionNumber} key={'Section'+sectionNumber}/>]; 
        setQuestionArea(newQuestionArea);
    }

    function handleAddQuestion() { 
        let newQuestionNumber = questionNumber + 1; 
        setQuestionNumber(newQuestionNumber); 
        let newQuestionArea = [...questionArea, <Question questionNum={questionNumber} key={'Question'+questionNumber}/>]; 
        setQuestionArea(newQuestionArea);
    }

    useEffect(() => { 
        let newQuestionArea = [<Section sectionNum={sectionNumber} key={'Section'+sectionNumber}/>, <Question questionNum={questionNumber} key={'Question'+questionNumber}/>];
        let newSectionNumber = sectionNumber + 1; 
        setSectionNumber(newSectionNumber);
        let newQuestionNumber = questionNumber + 1; 
        setQuestionNumber(newQuestionNumber);
        setQuestionArea(newQuestionArea);
    }, [])

    return (
        <div className="d-flex align-items-start mt-3">
            <StickyBox>
                <div className="ms-3 border border-dark rounded mt-3 p-3">
                    <button className="btn btn-primary d-block mb-3" onClick={() => handleAddSection()}>Add Section</button>
                    <button className="btn btn-primary d-block" onClick={() => handleAddQuestion()}>Add Question</button>
                </div>
            </StickyBox>
            <div className="mx-auto w-75 mt-3">
                {questionArea}
            </div>
        </div>
    )
}

export default QuestionsSection;