import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { FormDetails, QuestionsSection, SubmitBtn } from '../components/formBuilder/index.js';
import { Today } from '@mui/icons-material';
import { createFormTemplate } from '../services/FormTemplate.js';

const FormBuilder = (props) => {
    const [questionSectionArea, setQuestionSectionArea] = useState(null); 

    function handleFormBuilderSubmit(e) { 
        // ken remove the preventDefault once you are done checking. what it does is to prevent the page from reloading upon form submission.
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let today = new Date().toJSON(); 
        console.log(questionSectionArea);
        let sectionList = []; 
        let questionList = []; 
        let sectionOrder = 1; 
        let questionOrder = 1; 
        let sectionInFocus; 
        for (let item of questionSectionArea) { 
            let itemId = item.key; 
            if (itemId.includes("Section")) { 
                sectionInFocus = sectionOrder; 
                sectionList.push({
                    sectionName: data.get(itemId + 'sectionName'),
                    sectionOrder: sectionOrder,
                    // bernice ken softcode assignedTo once the GET params flow is set up 
                    assignedTo: data.get(itemId + 'assignedTo'),
                    createdAt: today, 
                    updatedAt: today
                })
                sectionOrder++; 
            } else { 
                let questionType = data.get(itemId + 'questionType');
                let questionObj = {
                    questionTitle: data.get(itemId + 'questionTitle'),
                    questionOrder: questionOrder,
                    belongsToSection: sectionInFocus,
                    questionType: questionType,
                    isRequired: (data.get(itemId + 'isRequired') ? true : false),
                    createdAt: today, 
                    updatedAt: today,
                }; 
                if (questionType === 'radio' || questionType === 'dropdown' || questionType === 'checkbox') { 
                    questionObj['choices'] = data.get(itemId + 'choices').split(',');
                } else if (questionType === 'scale') { 
                    questionObj['minValue'] = parseInt(data.get(itemId + 'minValue'));
                    questionObj['maxValue'] = parseInt(data.get(itemId + 'maxValue'));
                    questionObj['minLabel'] = data.get(itemId + 'minLabel');
                    questionObj['maxLabel'] = data.get(itemId + 'maxLabel');
                }
                questionList.push(questionObj);
                questionOrder++;
            }
        }
        console.log(sectionList)
        let formTemplateData = {
            formName: data.get('formName'),
            formDescription: data.get('formDescription'),
            // bernice ken softcode createdBy once the GET params flow is set up
            createdBy: "6411538f436af646394c3fe4",
            createdAt: today,
            updatedAt: today,
            sections: sectionList,
            questions: questionList
        };
        console.log(formTemplateData);
        createFormTemplate(formTemplateData)
            .then(response => {
                console.log(response);
            })
            .catch(error => { 
                console.log(error.message);
            })
    }

    function handleQuestionSectionArea(newQuestionSectionArea) { 
        setQuestionSectionArea(newQuestionSectionArea);
    }

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
            <Box component="form" onSubmit={handleFormBuilderSubmit}>
                <FormDetails />
                <QuestionsSection handleQuesSecUpdate={handleQuestionSectionArea}/>
                <SubmitBtn />
            </Box>
        </>
    );
};

export default FormBuilder;
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<FormBuilder />);