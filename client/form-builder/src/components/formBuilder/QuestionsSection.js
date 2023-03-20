import React, { useEffect, useState } from 'react';
import { Question, Section } from './index.js';
import StickyBox from "react-sticky-box";
import { Button, Stack, IconButton, Box } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


const QuestionsSection = (props) => {
    const [questionArea, setQuestionArea] = useState(Array(0));
    const [sectionNumber, setSectionNumber] = useState(1);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [quesSecDelete, setQuesSecDelete] = useState(null); 
    const [quesSecInput, setQuesSecInput] = useState({});

    function handleAddSection() {
        let newSectionNumber = sectionNumber + 1;
        setSectionNumber(newSectionNumber);
        let newQuestionArea = [...questionArea, <Section sectionNum={sectionNumber} key={'Section' + sectionNumber} handleDeleteSection={handleDeleteQuesSec}/>];
        setQuestionArea(newQuestionArea);
    }

    function handleAddQuestion() {
        let newQuestionNumber = questionNumber + 1;
        setQuestionNumber(newQuestionNumber);
        let newQuestionArea = [...questionArea, <Question questionNum={questionNumber} key={'Question' + questionNumber} handleDeleteQuestion={handleDeleteQuesSec}/>];
        setQuestionArea(newQuestionArea);
    }

    function handleDeleteQuesSec(toDelete) { 
        setQuesSecDelete(toDelete); 
    }

    const quesSecInputRef = {
        text: {title: ""}, 
        textarea: {title: ""},
        radio: {title: "", choices: []},
        checkbox: {title: "", choices: []},
        dropdown: {title: "", choices: []},
        scale: {title: "", minValue: 1, maxValue: 5, minLabel: "", maxLabel: ""},
        file: {title: ""}
    }

    function handleInputQuestionTypeChange(questionId, newQuesType) { 
        let newQuesSecInput = {...quesSecInput}; 
        newQuesSecInput[questionId] = {type: newQuesType, content: quesSecInputRef[newQuesType]};
        setQuesSecInput(newQuesSecInput);
    }

    function handleSectionInputChange(sectionId, newSectionName) { 
        let newQuesSecInput = {...quesSecInput}; 
        newQuesSecInput[sectionId] = {name: newSectionName, assignedTo: "vendor"}; 
        setQuesSecInput(newQuesSecInput);
    }

    useEffect(() => { 
        const copyQuestionArea = questionArea.filter((quesSec) => quesSec.key !== quesSecDelete)
        setQuestionArea(copyQuestionArea);
    }, [quesSecDelete])

    function handleOnDragEnd(result) {
        const items = Array.from(questionArea);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setQuestionArea(items);
    }

    useEffect(() => {
        let newQuestionArea = [<Section sectionNum={sectionNumber} key={'Section' + sectionNumber}  handleDeleteSection={handleDeleteQuesSec}/>, 
                                <Question questionNum={questionNumber} key={'Question' + questionNumber}  handleDeleteQuestion={handleDeleteQuesSec}/>];
        let newSectionNumber = sectionNumber + 1;
        setSectionNumber(newSectionNumber);
        let newQuestionNumber = questionNumber + 1;
        setQuestionNumber(newQuestionNumber);
        setQuestionArea(newQuestionArea);
    }, [])

    useEffect(() => { 
        props.handleQuesSecUpdate(questionArea);
    }, [questionArea])

    return (
        <div className="d-flex align-items-start mt-3 w-75 mx-auto">
            <StickyBox>
                <Box className="ms-3 bg-light rounded p-3" sx={{marginY: 14}}>
                    <Stack>
                        <Button sx={{borderRadius:'10%'}} onClick={() => handleAddSection()} color='secondary'>
                            <PostAddIcon />
                        </Button>
                        <Button sx={{borderRadius:'10%',mt: 3}} onClick={() => handleAddQuestion()} color='secondary'>
                            <AddCircleOutlineOutlinedIcon />
                        </Button>
                    </Stack>
                </Box>
            </StickyBox> 
            <DragDropContext onDragEnd={handleOnDragEnd} onDrop={e => { e.preventDefault(); }}>
                <Droppable droppableId="questionSections" onDrop={e => { e.preventDefault(); }}>
                    {(provided) => (
                        <div className="w-100 ms-3" {...provided.droppableProps} ref={provided.innerRef}>
                            {questionArea.map((quesSec, index) => {
                                return (
                                    <Draggable key={index} draggableId={index.toString()} index={index} onDrop={e => { e.preventDefault(); }}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}> 
                                            {quesSec}
                                        </div>
                                    )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default QuestionsSection;