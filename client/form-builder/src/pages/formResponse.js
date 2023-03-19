import React, { useEffect, useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { FormInfo, QuestionView, SectionView } from '../components/FormResponse/index.js';
import { getFormTemplateById } from '../services/FormTemplate.js';
import { createFormResponse, updateFilesInFormAnswer } from '../services/FormResponse.js';

const FormResponse = (props) => {
    const [questionsSectionArea, setQuestionsSectionArea] = useState(Array(0)); 
    const [formTemplate, setFormTemplate] = useState(null);
    const [formInfo, setFormInfo] = useState(null);
    const [fileMap, setFileMap] = useState({});

    function handleFormResponseSubmit(e) { 
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
        for (let i=1; i<numOfQuestions; i++) { 
            let dataToStore = data.get(i.toString()); 
            if (listOfMultiSelect.includes(i)) { 
                dataToStore = data.get(i.toString()).split(',');
            }
            formAnswer[i] = dataToStore;
        }
        let formResponseData = { 
            formTemplateId: "6414f557b713704fd25c1b34",
            vendorId: "6409dc37e3139a5d267579b3",
            reviewedBy: "6411538f436af646394c3fe4",
            approvedBy: "6409dc0be3139a5d267579b2",
            status: 'open', 
            formAnswer: formAnswer
        }
        console.log(formResponseData);
        console.log(fileMap);
        let formData = new FormData(); 
        formData.append("formResponse", JSON.stringify(formResponseData)); 
        for (const [key, value] of Object.entries(fileMap)) {
            formData.append(`fileMap`, value);
        }
        // formData.append("fileMap", fileMap);
        // formData.append("formResponse", `{"formTemplateId":"6414f557b713704fd25c1b34","vendorId":"6409dc37e3139a5d267579b3","reviewedBy":"6411538f436af646394c3fe4","approvedBy":"6409dc0be3139a5d267579b2","status":"open","formAnswer":{"1":"ken","2":"ken is sleeping","3":"0","4":["1","2"],"5":"0","6":""}}`);
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        createFormResponse(formData) 
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

    function handleFileUpload(questionOrder, fileToUpload) { 
        let newFileMap = {...fileMap}; 
        newFileMap[questionOrder] = fileToUpload; 
        setFileMap(newFileMap); 
    }

    useEffect(() => { 
        // let newQuestionsSectionArea = [...questionsSectionArea, <QuestionView />]; 
        // setQuestionsSectionArea(newQuestionsSectionArea); 
        getFormTemplateById('6414f557b713704fd25c1b34')
            .then(response => { 
                // console.log(response);
                setFormTemplate(response);
            })
            .catch(error => { 
                console.log(error.message);
            })
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
        }
    }, [formTemplate])

    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
            {formInfo}
            <Box component='form' onSubmit={handleFormResponseSubmit}>
                {questionsSectionArea.map((item) => { 
                    if (item.hasOwnProperty('sectionId')) { 
                        return (<SectionView section={item} key={"Section" + item.sectionOrder}></SectionView>)
                    } else { 
                        return ( 
                            <QuestionView question={item} key={"Question" + item.questionOrder} handleFileUpload={handleFileUpload}></QuestionView>
                        )
                    }
                })}
                <Button type='submit' variant='contained'>Submit Form</Button>
            </Box>
        </div>
    );
};

export default FormResponse;
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<FormBuilder />);
