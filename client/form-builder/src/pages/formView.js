import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { FormInfo, QuestionView, SectionView } from '../components/FormView/index.js';
// test 32r

const FormView = (props) => {
    const questions = ['text', 'textarea', 'radio', 'checkbox', 'dropdown', 'scale', 'file'];
    const [questionsSectionArea, setQuestionsSectionArea] = useState(Array(0)); 

    useEffect(() => { 
        let newQuestionsSectionArea = [...questionsSectionArea, <QuestionView />]; 
        setQuestionsSectionArea(newQuestionsSectionArea); 
    }, []) 

    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
            <FormInfo/>
            <SectionView></SectionView>
            {questions.map((question) => { 
                return ( 
                    <QuestionView questionType={question}></QuestionView>
                )
            })}
        </div>
    );
};

export default FormView;
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<FormBuilder />);
