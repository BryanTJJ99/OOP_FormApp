import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';


const Choice = (props, handleDeleteChoice) => { 
    const [type, setType] = useState(null); 

    return ( 
        <div id={'Question' + props.questionNum + 'Choice' + props.choiceNum} className="input-group d-flex mb-3 choice">
            <div className="form-check">
                <input type={props.type} className="form-check-input py-auto"></input>
            </div>
            <input type='text' className="form-control w-50" placeholder={`Option ${props.choiceNum + 1}`}></input>
            <div className="deleteButton ms-4">
                <button className="btn btn-transparent btn-rounded btn-sm ml-2 delete_question" onClick={() => props.handleDeleteChoice(props.choiceNum)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#df4759" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                </button>
            </div>
        </div>
    )

}

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
    })

    return (
        <div className="d-block">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="my-auto">Choices</label>
                <button className="btn btn-secondary btn-sm" onClick={() => handleAddQuestionClick(renderChoice())}>Add choice</button>
            </div>
            {choicesList}
        </div>
    )
}

const TextInput = (props) => { 
    return (
        <div className="d-block">
            <input type="text" className="form-control" value={props.value} disabled></input>
        </div>
    )
} 

const LinearScale = (props) => { 
    const [minVal, setMinVal] = useState(1); 
    const [maxVal, setMaxVal] = useState(5); 

    return (
        <div className="d-block">
            <div className="d-flex form-group input-group mb-3">
                <div>
                    <select value={minVal} className="form-select m-0" onChange={(event) => setMinVal(event.target.value)}>
                        <option>0</option>
                        <option>1</option>
                    </select>
                </div>
                <label className="my-auto mx-3">to</label>
                <div>
                    <select value={maxVal} className="form-select m-0" onChange={(event) => setMaxVal(event.target.value)}>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>
                </div>
            </div>
            <div className="d-block">
                <div className="d-flex mb-3 row w-50">
                    <span className="my-auto col-1">{minVal}</span>
                    <input type="text" className="col-5 form-control w-75" placeholder="Min value label"></input>
                </div>
                <div className="d-flex row w-50">
                    <span className="my-auto col-1">{maxVal}</span>
                    <input type="text" className="col-5 form-control w-75" placeholder="Max value label"></input>
                </div>
            </div>
        </div>
    )
}

const FileUpload = (props) => { 
    return (
        <div className="d-block">
            <button className="btn btn-primary">Upload file</button>
        </div>
    )
}

const Question = (props) => { 
    const [questionType, setQuestionType] = useState('text');
    const [questionNum, setQuestionNum] = useState(0);
    const [showOption, setShowOption] = useState('text'); 
    const [specialQuesSection, setSpecialQuesSection] = useState(0);
    const [questionTitle, setQuestionTitle] = useState("Question 1 Title");

    function handleChangeQuestionType(value) {
        if (value === 'radio' || value === 'checkbox' || value === 'dropdown') {
            setShowOption("choice" );
        } else if (value === 'file') {
            setShowOption("file");
        } else if (value === 'scale') {
            setShowOption("scale" );
        } else {
            setShowOption("text");
        }
        setQuestionType(value);
    }

    let to_update; 
    useEffect(() => { 
        if (showOption === "choice") {
            // this.setState({specialQuesSection: <Choices/>})
            to_update = <Choices questionType={questionType} questionNum={questionNum}/>;
        } else if (showOption === "file") {
            to_update = <FileUpload />;
        } else if (showOption === "scale") {
            to_update = <LinearScale />;
        } else {
            let textInputValue = '';
            if (questionType === 'text') {
                textInputValue = 'Short text answer';
            } else {
                textInputValue = 'Paragraph answer';
            }
            to_update = <TextInput value={textInputValue} />;
        }
        setSpecialQuesSection(to_update); 
    }, [showOption])
    
    return (
        <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div className="w-50">
                    <input type="text" className="form-control" value={questionTitle} onChange={(event) => setQuestionTitle(event.target.value)}></input>
                </div>
                <div className="d-flex">
                    <button className="btn btn-light btn-rounded btn-sm ml-2 move_question_up">Move up</button>
                    <button className="btn btn-light btn-rounded btn-sm ml-2 move_question_down">Move down</button>
                    <button className="btn btn-danger btn-rounded btn-sm ml-2 delete_question">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="card-body">
                <div className="form-group input-group mb-3">
                    <label className="my-auto me-3">Question type: </label>
                    <div className="w-25">
                        <select name="questionType" className="form-select" onChange={(event) => handleChangeQuestionType(event.target.value)}>
                            <option value="text">Short text</option>
                            <option value="textarea">Paragraph</option>
                            <option value="radio">Multiple choice</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="dropdown">Dropdown</option>
                            <option value="scale">Linear scale</option>
                            <option value="file">File upload</option>
                        </select>
                    </div>
                </div>
                <div className="form-group choices_section">
                    {specialQuesSection}
                </div>
            </div>
            <div className="card-footer d-flex">
                <div className="d-flex">
                    <div className="form-check form-switch me-5">
                        <input className="form-check-input" type="checkbox"></input>
                        <label className="form-check-label">Required</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox"></input>
                        <label className="form-check-label">Conditional</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Section = (props) => { 
    const [sectionTitle, setSectionTitle] = useState('Section 1 Title'); 

    return (
        <div className="card mb-3">
            <div className="card-body bg-secondary rounded">
                <div className="d-flex justify-content-between align-items-right mb-2">
                    <input type="text" className="form-control section_container bg-transparent text-white me-3" value={sectionTitle} onChange={(event) => setSectionTitle(event.target.value)}></input>
                    <button className="btn btn-danger btn-rounded btn-sm ml-2 delete_section">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    )
}

const QuestionsSection = (props) => { 
    const [questionArea, setQuestionArea] = useState(Array(0)); 

    return (
        <div className="mx-5">
            <Section></Section>
            <Question></Question>
            {questionArea}
        </div>
    )
}


const FormBuilder = (props) => {
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
            <QuestionsSection />
        </>
    );
};

export default FormBuilder;
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<FormBuilder />);