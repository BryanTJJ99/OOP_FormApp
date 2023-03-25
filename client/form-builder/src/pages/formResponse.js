import React, { useEffect, useState } from 'react';
import { TextField, Box, Button, Typography, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { FormInfo, QuestionView, SectionView } from '../components/FormResponse/index.js';
import { getFormTemplateById } from '../services/FormTemplate.js';
import { updateFormResponse, getFormResponseById, updateFilesInFormAnswer } from '../services/FormResponse.js';
import StatusChip from '../components/Dashboard/StatusChip.js';

const FormResponse = (props) => {
    const [questionsSectionArea, setQuestionsSectionArea] = useState(Array(0));
    const [formResponse, setFormResponse] = useState(null);
    const [formTemplate, setFormTemplate] = useState(null);
    const [formInfo, setFormInfo] = useState(null);
    const [fileMap, setFileMap] = useState({});
    const [nextStage, setNextStage] = useState('default');
    const [statusSection, setStatusSection] = useState(null);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [currStage, setCurrStage] = useState(null);
    const [emailMessage, setEmailMessage] = useState(null);

    const nextStageRef = { 
        'vendor': 'admin', 
        'admin': 'approver', 
    }

    const handleNextStageChange = (event) => {
        console.log(event.target.value)
        setNextStage(event.target.value);
    };

    function handlePopUpClose() { 
        setOpenPopUp(false);
    }

    function handlePopUpOpen() { 
        setOpenPopUp(true);
    }

    async function handleFormResponseSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let numOfQuestions = formTemplate.questions.length;
        let listOfMultiSelect = [];
        for (let ques of formTemplate.questions) {
            if (ques.questionType === 'checkbox') {
                listOfMultiSelect.push(ques.questionOrder);
            }
        }
        let formAnswer = {};
        for (let i = 1; i <= numOfQuestions; i++) {
            let dataToStore = data.get(i.toString());
            if (listOfMultiSelect.includes(i)) {
                dataToStore = data.get(i.toString()).split(',');
            }
            console.log(i)
            if (i in fileMap) {
                let fileToStore = fileMap[(i).toString()];
                let file_type = fileToStore.type;
                const reader = new FileReader();
                // reader.readAsDataURL(fileToStore);
                await readFileAsync(fileToStore, reader)
                    .then(result => {
                        // console.log(result)

                        dataToStore = [result, file_type];

                    })
                    .catch(error => {
                        console.log(error.message);
                    })
                // let base64String; 
                // reader.onload = function () {
                //     console.log(reader, reader.result)
                //     base64String = reader.result.split(',')[1];
                //     dataToStore = base64String;
                // };
            }
            formAnswer[i] = dataToStore;
        }
        let today = new Date().toJSON(); 
        let statusUpdated; 
        if (currStage !== 'approver') { 
            statusUpdated = nextStageRef[currStage]; 
        } else { 
            statusUpdated = nextStage; 
        }
        let formResponseData = {
            formResponseId: formResponse.formResponseId,
            status: statusUpdated, 
            formAnswer: formAnswer, 
            updatedAt: today,
        }
        console.log(formResponseData);
        // console.log(fileMap);
        // let formData = new FormData(); 
        // formData.append("formResponse", JSON.stringify(formResponseData)); 
        // for (const [key, value] of Object.entries(fileMap)) {
        //     formData.append(`fileMap`, value);
        // }
        // formData.append("fileMap", fileMap);
        // formData.append("formResponse", `{"formTemplateId":"6414f557b713704fd25c1b34","vendorId":"6409dc37e3139a5d267579b3","reviewedBy":"6411538f436af646394c3fe4","approvedBy":"6409dc0be3139a5d267579b2","status":"open","formAnswer":{"1":"ken","2":"ken is sleeping","3":"0","4":["1","2"],"5":"0","6":""}}`);
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        updateFormResponse(formResponseData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.message);
            })

        // updateFilesInFormAnswer(fileMap, "64164098499249116ec5c17e") 
        //     .then(response => { 
        //         console.log(response); 
        //     })
        //     .catch(error => { 
        //         console.log(error.message);
        //     })
    }

    async function readFileAsync(file, reader) {
        return new Promise((resolve, reject) => {
            reader.onload = () => {
                let base64String = reader.result.split(',')[1];
                console.log(reader.result.split(','))
                resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function handleFileUpload(questionOrder, fileToUpload) {
        let newFileMap = { ...fileMap };
        newFileMap[questionOrder] = fileToUpload;
        setFileMap(newFileMap);
    }

    function submitForm() { 
        
    }

    useEffect(() => {
        // let newQuestionsSectionArea = [...questionsSectionArea, <QuestionView />]; 
        // setQuestionsSectionArea(newQuestionsSectionArea); 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const formResponseId = urlParams.get('formResponseId');
        getFormResponseById(formResponseId) 
            .then(response => { 
                setFormResponse(response); 
                console.log(response); 
                let formTemplateId = response.formTemplateId; 
                getFormTemplateById(formTemplateId)
                    .then(response => {
                        // console.log(response);
                        setFormTemplate(response);
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            })

    }, [])

    function toTitleCase(str) {
        return str.toLowerCase().split(' ').map(function (word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }

    const emailRecipient = {
        vendor: 'Admin',
        admin: 'Approver',
        approver: 'Vendor and Admin'
    }

    useEffect(() => { 
        if (formTemplate !== null) { 
            setFormInfo(<FormInfo formTemplate={formTemplate}/>);
            // bernice ken the currStatus is hardcoded
            let currStatus = formResponse.status; 
            setCurrStage(currStatus);
            setStatusSection(<Box display={'flex'} justifyContent='space-between' className='mx-5 mt-5'> 
                                <Box display='flex'> 
                                    <Typography marginY={'auto'} marginRight={1}>Status:</Typography>
                                    <Box marginY='auto'> 
                                        <StatusChip status={currStatus}></StatusChip>
                                    </Box>
                                </Box>
                            </Box>)
            let questionSectionDict = {}; 
            console.log(formTemplate); // give an Axios error
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
        }
    }, [formTemplate])

    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
            {formInfo}
            {statusSection}
            <Box component='form' onSubmit={handleFormResponseSubmit}>
                {questionsSectionArea.map((item) => {
                    if (item.hasOwnProperty('sectionId')) {
                        return (<SectionView section={item} key={"Section" + item.sectionOrder}></SectionView>)
                    } else {
                        return (
                            <QuestionView question={item} key={"Question" + item.questionOrder} handleFileUpload={handleFileUpload} response={formResponse}></QuestionView>
                        )
                    }
                })}
                <Box display={'flex'} sx={{float:'right'}} className='me-5'>
                    <Box marginRight={2}>
                        <Button variant='contained'>Save</Button>
                    </Box>
                    <Box>
                        <Button type="submit" variant='contained' onClick={handlePopUpOpen}>Submit Form</Button>
                    </Box>
                </Box>
            </Box>
                
            <Dialog
                open={openPopUp}
                onClose={handlePopUpClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                {`Write an email to ${emailRecipient[currStage]}:`}
                </DialogTitle>
                <TextField value={emailMessage} placeholder="Your email message" multiline rows={3} sx={{marginX:3}}></TextField>
                {/* {nextStageElem} */}
                {currStage === 'approver' && <Box display='flex' margin={3}> 
                    <Typography marginY={'auto'} marginRight={1}>Assign:</Typography>
                    <FormControl size="small" fullWidth>
                        <Select id="demo-select-small" value={nextStage} onChange={handleNextStageChange}>
                            <MenuItem value='default' disabled>Select next stage</MenuItem>
                            <MenuItem value='approved'>Approved</MenuItem>
                            <MenuItem value='vendor'>Rejected, back to Vendor</MenuItem>
                            <MenuItem value='admin'>Rejected, back to Admin</MenuItem>
                        </Select>
                    </FormControl>
                </Box>}
                <DialogActions>
                    <Button onClick={handlePopUpClose}>Cancel</Button>
                    <Button onClick={submitForm}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FormResponse;
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<FormBuilder />);
