import React, { useEffect, useState } from 'react';
import { Choice } from './index.js';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const Choices = (props) => { 
    const [choiceNum, setChoiceNum] = useState(0);
    const [choicesList, setChoicesList] = useState(Array(0));
    const [choicesOrder, setChoicesOrder] = useState({});
    const [choiceToDelete, setChoiceToDelete] = useState(null);
    const [choicesLabels, setChoicesLabels] = useState({}); 
    const [hiddenInput, setHiddenInput] = useState(null);


    function renderChoice(choiceNo=choiceNum) { 
        setChoiceNum(choiceNo + 1); 
        if (choiceNo <= props.choicesList.length) { 
            return (
                <Choice
                    choiceNum={choiceNo}
                    // choiceOrder={getChoiceOrder(choiceNum)}
                    questionNum={props.questionNum}
                    type={props.questionType}
                    handleDeleteChoice={handleDeleteChoice}
                    key={props.questionId + '_' + choiceNo}
                    choiceId={props.questionId + '_' + choiceNo}
                    updateChoiceLabel={updateChoicesLabel}
                    choiceInput={props.choicesList[choiceNo]}
                />
            )
        } else { 
            return (
                <Choice
                    choiceNum={choiceNo}
                    // choiceOrder={getChoiceOrder(choiceNum)}
                    questionNum={props.questionNum}
                    type={props.questionType}
                    handleDeleteChoice={handleDeleteChoice}
                    key={props.questionId + '_' + choiceNo}
                    choiceId={props.questionId + '_' + choiceNo}
                    updateChoiceLabel={updateChoicesLabel}
                    choiceInput={''}
                />
            )
        }
        
    }
    
    const handleAddQuestionClick = (newChoice) => { 
        setChoicesList(choicesList => [...choicesList, newChoice]); 
        let copyChoicesOrder = Object.assign({}, choicesOrder);
        copyChoicesOrder[choiceNum] = Object.keys(copyChoicesOrder).length;
        setChoicesOrder(copyChoicesOrder); 
    }

    function handleDeleteChoice(deleteChoiceNum) { 
        setChoiceToDelete(deleteChoiceNum);
    }

    function updateChoicesLabel(choiceId, valueToUpdate) { 
        let newChoicesLabels = {...choicesLabels}; 
        newChoicesLabels[choiceId] = valueToUpdate; 
        setChoicesLabels(prevChoicesLabels => {
            return { ...prevChoicesLabels, ...newChoicesLabels };
          });
    }

    useEffect(() => {
        const copyChoicesList = choicesList.filter((choice) => parseInt(choice.props.choiceNum) !== choiceToDelete)
        setChoicesList(copyChoicesList);
    }, [choiceToDelete])

    useEffect(() => { 
        setChoicesList(Array(0))
        if (props.choicesList) { 
            setChoicesList(props.choicesList)
        }
    }, [])

    // function getChoiceOrder(choiceKey) { 
    //     let order = 1; 
    //     for (let choice of choicesList) { 
    //         console.log(choice.props.choiceNum, choiceKey)
    //         if (choice.props.choiceNum === choiceKey) { 
    //             console.log("oifefeioj")
    //             return order; 
    //         } 
    //         order++;
    //     }
    //     return order++;
    // }

    useEffect(() => { 
        if (props.choicesList.length > 0) { 
            let choices = [] 
            let newChoicesLabels = {...choicesLabels}; 
            let newChoiceNum = choiceNum; 
            for (let i=0; i<props.choicesList.length; i++) { 
                choices.push(renderChoice(newChoiceNum));
                newChoicesLabels[props.questionId + '_' + newChoiceNum] = props.choicesList[i]; 
                newChoiceNum++
            }
            console.log(choices)
            setChoicesList(choicesList => choices);
            setChoiceNum(newChoiceNum);
            setChoicesLabels(newChoicesLabels); 
            console.log(newChoicesLabels)
        } else { 
            let firstChoice = renderChoice();
            setChoicesList(choicesList => [firstChoice]);
        }
    }, [])

    useEffect(() => {
        let finalChoiceList = []; 
        console.log(choicesList, choicesLabels)
        for (let ch of choicesList) { 
            console.log(ch.key)
            finalChoiceList.push(choicesLabels[ch.key])
        }
        setHiddenInput(<input type='hidden' name={props.questionId + 'choices'} value={finalChoiceList}></input>)
        console.log(finalChoiceList)
        console.log(choicesList, choicesLabels)
    }, [choicesLabels, choicesList])

    return (
        <div className="d-block w-100" key={props.questionType}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="my-auto">Choices</label>
                <IconButton color='secondary' onClick={() => handleAddQuestionClick(renderChoice())}><AddIcon sx={{ fontSize: "30px" }}/></IconButton>
            </div>
            {choicesList}
            {hiddenInput}
        </div>
    )
}

export default Choices;