import React, { useEffect, useState } from 'react';
import { FormDetails, QuestionsSection, SubmitBtn } from '../components/formBuilder/index.js';

const FormBuilder = (props) => {
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
            
            <FormDetails />
            <QuestionsSection />
            <SubmitBtn />
        </>
    );
};

export default FormBuilder;
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<FormBuilder />);