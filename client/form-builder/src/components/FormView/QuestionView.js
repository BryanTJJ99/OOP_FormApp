import React, { useEffect, useState } from 'react';
import { Typography, Card } from '@mui/material';

const QuestionView = (props) => {
    const [questionArea, setQuestionArea] = useState(Array(0));

    useEffect(() => { 

    }, [])

    return (
        <Card variant="outlined" className="m-5">
            {questionArea}
        </Card>
    )
}

export default QuestionView;