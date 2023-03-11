import React, { useEffect, useState } from 'react';
import { Choice } from './index.js';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const Choices = (props) => { 
    const [choiceNum, setChoiceNum] = useState(0);
    const [choicesList, setChoicesList] = useState(Array(0));
    const [choicesOrder, setChoicesOrder] = useState({});
    const [firstChoiceRendered, setFirstChoiceRendered] = useState(false); 
    const [choiceToDelete, setChoiceToDelete] = useState(null);

    function renderChoice() { 
        setChoiceNum(choiceNum + 1); 
        return (
            <Choice
                choiceNum={choiceNum}
                // choiceOrder={getChoiceOrder(choiceNum)}
                questionNum={props.questionNum}
                type={props.questionType}
                handleDeleteChoice={handleDeleteChoice}
                
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

    useEffect(() => {
        console.log(choiceToDelete, choicesList)
        const copyChoicesList = choicesList.filter((choice) => parseInt(choice.props.choiceNum) !== choiceToDelete)
        setChoicesList(copyChoicesList);
        // const newChoicesOrder = {}; 
        // let order = 1;
        // for (let choice of choicesList) { 
        //     console.log(choice.props.choiceNum);
        //     newChoicesOrder[choice.props.choiceNum] = order; 
        //     order++;
        // }
    }, [choiceToDelete])

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
        if (!firstChoiceRendered) { 
            setFirstChoiceRendered(true); 
            let firstChoice = renderChoice();
            setChoicesList(choicesList => [firstChoice]);
        }
    }, [])

    return (
        <div className="d-block">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="my-auto">Choices</label>
                
                <IconButton color='secondary' onClick={() => handleAddQuestionClick(renderChoice())}><AddIcon sx={{ fontSize: "30px" }}/></IconButton>
            </div>
            {choicesList}
        </div>
    )
}

export default Choices;