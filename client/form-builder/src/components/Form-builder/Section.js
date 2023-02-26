import React, { useEffect, useState } from 'react';

const Section = (props) => { 
    const [sectionTitle, setSectionTitle] = useState(`Section ${props.sectionNum} Title`); 

    return (
        <div className="card mb-3" id={'Section' + props.sectionNum}>
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

export default Section;