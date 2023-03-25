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

    function renderChoice() { 
        setChoiceNum(choiceNum + 1); 
        return (
            <Choice
                choiceNum={choiceNum}
                // choiceOrder={getChoiceOrder(choiceNum)}
                questionNum={props.questionNum}
                type={props.questionType}
                handleDeleteChoice={handleDeleteChoice}
                key={props.questionId + '_' + choiceNum}
                choiceId={props.questionId + '_' + choiceNum}
                updateChoiceLabel={updateChoicesLabel}
            />
        )
    }
    
    const handleAddQuestionClick = (newChoice) => { 
        setChoicesList(choicesList => [...choicesList, newChoice]); 
        let copyChoicesOrder = Object.assign({}, choicesOrder);
        copyChoicesOrder[choiceNum] = Object.keys(copyChoicesOrder).length;
        setChoicesOrder(copyChoicesOrder); 
        console.log(choicesOrder)
    }

    function handleDeleteChoice(deleteChoiceNum) { 
        setChoiceToDelete(deleteChoiceNum);
    }

    function updateChoicesLabel(choiceId, valueToUpdate) { 
        let newChoicesLabels = {...choicesLabels}; 
        newChoicesLabels[choiceId] = valueToUpdate; 
        setChoicesLabels(newChoicesLabels); 
    }

    useEffect(() => {
        const copyChoicesList = choicesList.filter((choice) => parseInt(choice.props.choiceNum) !== choiceToDelete)
        setChoicesList(copyChoicesList);
    }, [choiceToDelete])

    useEffect(() => { 
        setChoicesList(Array(0))
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
        let firstChoice = renderChoice();
        setChoicesList(choicesList => [firstChoice]);
    }, [])

    useEffect(() => {
        let finalChoiceList = []; 
        for (let ch of choicesList) { 
            finalChoiceList.push(choicesLabels[ch.key])
        }
        setHiddenInput(<input type='hidden' name={props.questionId + 'choices'} value={finalChoiceList}></input>)
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