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
    const [quesSecInput, setQuesSecInput] = useState({
        Section1: {name: "", assignedTo: "vendor"}
    });

    const sectionElement = <Section 
                                sectionNum={sectionNumber} 
                                key={'Section' + sectionNumber} 
                                handleDeleteSection={handleDeleteQuesSec}
                                handleSectionInputChange={handleSectionInputChange} 
                                getSectionValues={getSectionValues}
                            />;
    const questionElement = <Question questionNum={questionNumber} key={'Question' + questionNumber} handleDeleteQuestion={handleDeleteQuesSec}/>;

    function handleAddSection() {
        let newSectionNumber = sectionNumber + 1;
        setSectionNumber(newSectionNumber);
        console.log(sectionNumber);
        handleSectionInputChange('Section' + sectionNumber)
        let newQuestionArea = [...questionArea, sectionElement, questionElement];
        setQuestionArea(newQuestionArea);
    }

    function handleAddQuestion() {
        let newQuestionNumber = questionNumber + 1;
        setQuestionNumber(newQuestionNumber);
        let newQuestionArea = [...questionArea, questionElement];
        setQuestionArea(newQuestionArea);
    }

    function handleDeleteQuesSec(toDelete) { 
        setQuesSecDelete(toDelete); 
    }

    const quesSecInputRef = {
        text: {title: ""}, 
        textarea: {title: ""},
        radio: {title: "", choices: {}},
        checkbox: {title: "", choices: {}},
        dropdown: {title: "", choices: {}},
        scale: {title: "", minValue: 1, maxValue: 5, minLabel: "", maxLabel: ""},
        file: {title: ""}
    }

    // function handleDragDropUpdateQuesSec(e) { 
    //     // e.preventDefault();
    //     const data = new FormData(e.currentTarget);
    //     console.log(data)
    //     console.log(questionArea);
    //     console.log(quesSecInput);
    //     let quesSecList = {}; 
    //     for (let item of questionArea) { 
    //         let itemId = item.key; 
    //         if (itemId.includes("Section")) { 
    //             console.log(document.getElementById(itemId + 'sectionName').placeholder)
    //             console.log(document.getElementById(itemId + 'assignedTo'))
    //             quesSecList[itemId] = ({
    //                 sectionName: data.get(itemId + 'sectionName'),
    //                 assignedTo: data.get(itemId + 'assignedTo'),
    //             })
    //         } else { 
    //             let questionType = data.get(itemId + 'questionType');
    //             let questionObj = {
    //                 questionTitle: data.get(itemId + 'questionTitle'),
    //                 questionType: questionType,
    //                 isRequired: (data.get(itemId + 'isRequired') ? true : false),
    //             }; 
    //             if (questionType === 'radio' || questionType === 'dropdown' || questionType === 'checkbox') { 
    //                 questionObj['choices'] = data.get(itemId + 'choices').split(',');
    //             } else if (questionType === 'scale') { 
    //                 questionObj['minValue'] = parseInt(data.get(itemId + 'minValue'));
    //                 questionObj['maxValue'] = parseInt(data.get(itemId + 'maxValue'));
    //                 questionObj['minLabel'] = data.get(itemId + 'minLabel');
    //                 questionObj['maxLabel'] = data.get(itemId + 'maxLabel');
    //             }
    //             quesSecList[itemId] = (questionObj);
    //         }
    //     }
    //     console.log(quesSecList)
    //     setQuesSecInput(quesSecList);
    // }

    function handleInputQuestionTypeChange(questionId, newQuesType) { 
        let newQuesSecInput = {...quesSecInput}; 
        newQuesSecInput[questionId] = {type: newQuesType, content: quesSecInputRef[newQuesType]};
        setQuesSecInput(newQuesSecInput);
    }

    function handleSectionInputChange(sectionId, newSectionName="", newAssignedTo="vendor") { 
        let newQuesSecInput = {...quesSecInput}; 
        console.log(newQuesSecInput)
        newQuesSecInput[sectionId] = {name: newSectionName, assignedTo: newAssignedTo}; 
        // if (newQuesSecInput.includes(sectionId)) { 
        //     newQuesSecInput[sectionId].
        // } else { 
        //     newQuesSecInput[sectionId] = {name: newSectionName, assignedTo: "vendor"}; 
        // }
        setQuesSecInput(newQuesSecInput);
    }

    function getSectionValues(sectionId, key) { 
        console.log(quesSecInput[sectionId][key])
        return quesSecInput[sectionId][key];
    }

    useEffect(() => { 
        const copyQuestionArea = questionArea.filter((quesSec) => quesSec.key !== quesSecDelete)
        setQuestionArea(copyQuestionArea);
    }, [quesSecDelete])

    function handleOnDragEnd(result) {
        // handleDragDropUpdateQuesSec(result)
        const items = Array.from(questionArea);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setQuestionArea(items);
    }

    useEffect(() => {
        handleSectionInputChange('Section' + sectionNumber)
        console.log(quesSecInput)
        handleAddSection()
        // handleAddQuestion()
        // let newQuestionArea = [<Section 
        //                             sectionNum={sectionNumber} 
        //                             key={'Section' + sectionNumber}  
        //                             handleDeleteSection={handleDeleteQuesSec} 
        //                             handleSectionInputChange={handleSectionInputChange} 
        //                             getSectionValues={getSectionValues}
        //                         />, 
        //                         <Question 
        //                             questionNum={questionNumber} 
        //                             key={'Question' + questionNumber}  
        //                             handleDeleteQuestion={handleDeleteQuesSec}
        //                         />];
        // let newSectionNumber = sectionNumber + 1;
        // setSectionNumber(newSectionNumber);
        // let newQuestionNumber = questionNumber + 1;
        // setQuestionNumber(newQuestionNumber);
        // setQuestionArea(newQuestionArea);
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
                                    {(provided1) => (
                                        <div ref={provided1.innerRef} {...provided1.draggableProps} {...provided1.dragHandleProps}> 
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