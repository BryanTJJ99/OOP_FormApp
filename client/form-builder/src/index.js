import React from 'react';
import ReactDOM from 'react-dom/client';

class Choice extends React.Component { 
    constructor(props) { 
        super(props); 
        this.state = { 
            key: null,
            type: null,
        }
    }

    render() { 
        return ( 
            <div id={this.props.choiceNum} className="input-group d-flex mb-3"> 
                <div className="form-check"> 
                    <input type={this.props.type} className="form-check-input py-auto"></input>
                </div>
                <input type='text' className="form-control w-50" placeholder={`Option ${this.props.choiceNum + 1}`}></input>
                <div className="deleteButton ms-4">
                    <button className="btn btn-transparent btn-rounded btn-sm ml-2 delete_question">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#df4759" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        )
    }
}

class Choices extends React.Component { 
    constructor(props) { 
        super(props);
        this.state = { 
            choiceNum: 0,
            choicesList: Array(0),
            firstChoiceRendered: false, 
        }
    }

    renderChoice() { 
        this.setState({choiceNum: this.state.choiceNum + 1})
        return (
            <Choice
                choiceNum={this.state.choiceNum}
                key={this.state.choiceNum}
                type={this.props.questionType}
            />
        )
    }

    handleAddQuestionClick(newChoice) {
        const newChoicesList = this.state.choicesList.slice();
        newChoicesList.push(newChoice);
        this.setState({choicesList: newChoicesList});
    }

    render() { 
        if (!this.state.firstChoiceRendered) { 
            let firstChoice = this.renderChoice(); 
            this.state.choicesList.push(firstChoice);
            this.setState({firstChoiceRendered: true});
        }
        
        return (
            <div className="d-block">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <label className="my-auto">Choices</label>
                    <button className="btn btn-secondary btn-sm" onClick={() => this.handleAddQuestionClick(this.renderChoice())}>Add choice</button>
                </div>
                {this.state.choicesList}
            </div>
        )
    }
}

class TextInput extends React.Component { 
    constructor(props) { 
        super(props);
    }

    render() { 
        return ( 
            <div className="d-block">
                <input type="text" className="form-control" value={this.props.value} disabled></input>
            </div>
        )
    }
}

class LinearScale extends React.Component { 
    constructor(props) { 
        super(props);
        this.state = { 
            minVal: 1,
            maxVal: 5,
        }
    }

    handleMinVal(value) { 
        const newMinVal = value; 
        this.setState({minVal: newMinVal});
    }

    handleMaxVal(value) { 
        const newMaxVal = value; 
        this.setState({maxVal: newMaxVal});
    }

    render() { 
        return (
            <div className="d-block">
                <div className="d-flex form-group input-group mb-3">
                    <div>
                        <select value={this.state.minVal} className="form-select m-0" onChange={(event) => this.handleMinVal(event.target.value)}>
                            <option>0</option>
                            <option>1</option>
                        </select>
                    </div>
                    <label className="my-auto mx-3">to</label>
                    <div>
                        <select value={this.state.maxVal} className="form-select m-0" onChange={(event) => this.handleMaxVal(event.target.value)}>
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
                        <span className="my-auto col-1">{this.state.minVal}</span>
                        <input type="text" className="col-5 form-control w-75" placeholder="Min value label"></input>
                    </div>
                    <div className="d-flex row w-50">
                        <span className="my-auto col-1">{this.state.maxVal}</span>
                        <input type="text" className="col-5 form-control w-75" placeholder="Max value label"></input>
                    </div>
                </div>
            </div>
        )
    }
}

class FileUpload extends React.Component { 
    constructor(props) { 
        super(props);
    }

    render() { 
        return ( 
            <div className="d-block"> 
                <button className="btn btn-primary">Upload file</button>
            </div>
        )
    }
}

class Question extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { 
            questionType: "text",
            showOption: "text", 
            specialQuesSection: null,
            questionTitle: "Question 1 title",
        }
    }

    handleChangeQuestionType(value) { 
        const newQuestionType = value;
        if (value === 'radio' || value === 'checkbox' || value === 'dropdown') { 
            this.setState({showOption: "choice"});
        } else if (value === 'file') { 
            this.setState({showOption: "file"});
        } else if (value === 'scale') {
            this.setState({showOption: "scale"});
        } else { 
            this.setState({showOption: "text"});
        }
        this.setState({questionType: newQuestionType})
    }

    handleQuestionTitleChange(value) { 
        const newQuestionTitle = value; 
        this.setState({questionTitle: newQuestionTitle});
    }

    render() { 
        if (this.state.showOption === "choice") { 
            // this.setState({specialQuesSection: <Choices/>})
            this.specialQuesSection = <Choices questionType={this.state.questionType}/>;
        } else if (this.state.showOption === "file") { 
            this.specialQuesSection = <FileUpload/>;
        } else if (this.state.showOption === "scale") {
            this.specialQuesSection = <LinearScale/>;
        } else { 
            let textInputValue = '';
            if (this.state.questionType === 'text') { 
                textInputValue = 'Short text answer';
            } else { 
                textInputValue = 'Paragraph answer';
            }
            this.specialQuesSection = <TextInput value={textInputValue}/>;
        }
        return ( 
            <div className="card mb-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="w-50">
                        <input type="text" className="form-control" value={this.state.questionTitle} onChange={(event) => this.handleQuestionTitleChange(event.target.value)}></input>
                    </div>
                    <div className="d-flex">
                        <button className="btn btn-light btn-rounded btn-sm ml-2 move_question_up">Move up</button>
                        <button className="btn btn-light btn-rounded btn-sm ml-2 move_question_down">Move down</button>
                        <button className="btn btn-danger btn-rounded btn-sm ml-2 delete_question">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="form-group input-group mb-3">
                        <label className="my-auto me-3">Question type: </label>
                        <div className="w-25">
                            <select name="questionType" className="form-select" onChange={(event) => this.handleChangeQuestionType(event.target.value)}>
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
                    {/* <div className="form-group">
                        <label>Question title: </label>
                        <input type="text" className="form-control"></input>
                    </div> */}
                    <div className="form-group choices_section">
                        {this.specialQuesSection}
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
}

class Section extends React.Component { 
    constructor(props) { 
        super(props);
        this.state = {
            sectionTitle: 'Section 1 title',
        }; 
    }

    handleSectionTitleChange(value) { 
        const newSectionTitle = value; 
        this.setState({sectionTitle: newSectionTitle});
    }

    render() { 
        return ( 
            <div className="card mb-3">
                <div className="card-body bg-secondary rounded">
                    <div className="d-flex justify-content-between align-items-right mb-2">
                        <input type="text" className="form-control section_container bg-transparent text-white me-3" value={this.state.sectionTitle} onChange={(event) => this.handleSectionTitleChange(event.target.value)}></input>
                        <button className="btn btn-danger btn-rounded btn-sm ml-2 delete_section">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </button>
                    </div>
                    
                </div>
            </div>
        )
    }
}


class QuestionsSection extends React.Component { 
    constructor(props) { 
        super(props);
        this.state = {
            questionArea: Array(0),
        }
    }

    render() { 
        return ( 
            <div className="mx-5">
                <Section></Section>
                <Question></Question>
                {this.state.questionArea}
            </div>
        )
    }
}

class FormBuilder extends React.Component { 
    constructor(props) { 
        super(props);
    }

    render() { 
        return (
            <div>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
                <QuestionsSection />
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FormBuilder />);