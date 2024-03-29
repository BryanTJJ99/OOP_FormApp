import React, { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { FormInfo, QuestionView, SectionView } from '../components/FormView/index.js';
import { getFormTemplateById, deleteFormTemplate } from '../services/FormTemplate.js';
import { getFormResponseById, getAllFormResponses } from '../services/FormResponse.js';

const FormView = (props) => {
    const [questionsSectionArea, setQuestionsSectionArea] = useState(Array(0)); 
    const [formResponse, setFormResponse] = useState({formAnswer: {}});
    const [formTemplate, setFormTemplate] = useState(null);
    const [formInfo, setFormInfo] = useState(null);
    const [allFormResponseId, setAllFormResponseId] = useState(null);
    const [deleteEditFail, setDeleteEditFail] = useState(false);
    const [deleteCfm, setDeleteCfm] = useState(false);
    const [editButton, setEditButton] = useState(null);
    const [failKeyword, setFailKeyword] = useState('deleted');

    useEffect(() => { 
        // let newQuestionsSectionArea = [...questionsSectionArea, <QuestionView />]; 
        // setQuestionsSectionArea(newQuestionsSectionArea); 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const formResponseId = urlParams.get('formResponseId')
        if (formResponseId !== null) { 
            getFormResponseById(formResponseId) 
                .then(response => {
                    setFormResponse(response);
                    let formTemplateId = response.formTemplateId
                    getFormTemplateById(formTemplateId)
                        .then(response => { 
                            setFormTemplate(response);
                        })
                        .catch(error => { 
                            console.log(error.message);
                        })
                })
                .catch(error => { 
                    console.log(error.message)
                })
        } else { 
            let formTemplateId = urlParams.get('formTemplateId')
            getFormTemplateById(formTemplateId)
                .then(response => { 
                    setFormTemplate(response);
                })
                .catch(error => { 
                    console.log(error.message);
                })
        }
    }, []) 

    useEffect(() => { 
        if (formTemplate !== null) { 
            setFormInfo(<FormInfo formTemplate={formTemplate}/>);
            let questionSectionDict = {}; 
            for (let section of formTemplate.sections) { 
                questionSectionDict[section.sectionOrder] = [];
            }
            for (let question of formTemplate.questions) { 
                questionSectionDict[question.belongsToSection].push(question);
            }
            let newQuestionsSectionArea = []
            for (let sectionOrderKey in questionSectionDict) { 
                for (let section of formTemplate.sections) { 
                    if (section.sectionOrder === parseInt(sectionOrderKey)) { 
                        newQuestionsSectionArea.push(section); 
                        break;
                    }
                }
                for (let question of questionSectionDict[sectionOrderKey]) { 
                    newQuestionsSectionArea.push(question);
                }
            }
            setQuestionsSectionArea(newQuestionsSectionArea);
            setEditButton(<Button variant="contained" className="ms-3" color='cyan' onClick={editForm}>Edit</Button>)
        }
    }, [formTemplate])

    function printPage() { 
        window.print(); 
    }

    function editForm() { 
        setFailKeyword('edited');
        getAllFormResponses()
            .then(response => { 
                let formResExist = false; 
                for (let formRes of response) { 
                    if (formRes.formTemplateId === formTemplate.formTemplateId) { 
                        formResExist = true; 
                        break; 
                    }
                }
                if (formResExist) { 
                    setDeleteEditFail(true);
                } else { 
                    window.location.href="/FormBuilderEdit?formTemplateId=" + formTemplate.formTemplateId; 
                }
            })
            .catch (error => { 
                console.log(error.message);
            })
    }

    function deleteForm() { 
        setFailKeyword('deleted');
        getAllFormResponses()
            .then(response => { 
                let formResExist = false; 
                for (let formRes of response) { 
                    if (formRes.formTemplateId === formTemplate.formTemplateId) { 
                        formResExist = true; 
                        break; 
                    }
                }
                if (formResExist) { 
                    setDeleteEditFail(true);
                } else { 
                    deleteFormTemplate(formTemplate.formTemplateId) 
                    .then(response => {
                        window.location.href = "/FormTemplates"
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
                }
            })
            .catch (error => { 
                console.log(error.message);
            })
    }

    const handleFailClose = () => {
        setDeleteCfm(false);
        setDeleteEditFail(false);
    };

    const handleDeleteCfm = () => {
        setDeleteCfm(false);
    };
    

    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
            {formInfo}
            <div className='d-flex mt-4 justify-content-end'>
                {/* <Button variant="contained" onClick={printPage} color='grey'>Print</Button> */}
                {editButton}
                <Button variant="contained" className="me-5 ms-3" onClick={() => setDeleteCfm(true)} color='error' >Delete</Button>
            </div>
            {questionsSectionArea.map((item) => { 
                if (item.hasOwnProperty('sectionId')) { 
                    return (<SectionView section={item} key={"Section" + item.sectionOrder}></SectionView>)
                } else { 
                    return ( 
                        <QuestionView question={item} response={formResponse} key={"Question" + item.questionOrder}></QuestionView>
                    )
                }
            })}
            <Dialog
                open={deleteEditFail}
                onClose={handleFailClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Form template cannot be " + failKeyword}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This form template has already been published to vendors. You may not delete or edit this form template. 
                    <br></br><br></br>
                    Please create a new form template if changes are required.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleFailClose}>Noted</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteCfm}
                onClose={handleDeleteCfm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone. Please confirm that you would like this form to be deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCfm}>No</Button>
                    <Button onClick={deleteForm}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FormView;
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<FormBuilder />);
