import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { FormInfo, QuestionView, SectionView } from '../components/FormView/index.js';
import { getFormTemplateById } from '../services/FormTemplate.js';

const FormView = (props) => {
    const [questionsSectionArea, setQuestionsSectionArea] = useState(Array(0)); 
    const [formTemplate, setFormTemplate] = useState(null);
    const [formInfo, setFormInfo] = useState(null);

    useEffect(() => { 
        // let newQuestionsSectionArea = [...questionsSectionArea, <QuestionView />]; 
        // setQuestionsSectionArea(newQuestionsSectionArea); 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const formTemplateId = urlParams.get('formTemplateId')
        getFormTemplateById(formTemplateId)
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
            {questionsSectionArea.map((item) => { 
                if (item.hasOwnProperty('sectionId')) { 
                    return (<SectionView section={item} key={"Section" + item.sectionOrder}></SectionView>)
                } else { 
                    return ( 
                        <QuestionView question={item} key={"Question" + item.questionOrder}></QuestionView>
                    )
                }
            })}
        </div>
    );
};

export default FormView;
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<FormBuilder />);
