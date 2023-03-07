import { Button, FileInput } from '@mui/material';
import React, { useEffect, useState } from 'react'; 
import { MuiFileInput } from 'mui-file-input'

// const FileUpload = (props) => { 
//     return (
//         <div className="d-block">
//             <FileInput label="Attachment" error={{ message: "Error" }} />,
//             <Button variant='contained' component='label'><input class='form-control' type="file" /></Button>
//         </div>
//     )
// }
const FileUpload = () => {
    const [file, setFile] = useState(null)

    const handleChange = (newFile) => {
        setFile(newFile)
    }

    return (
        <MuiFileInput value={file} onChange={handleChange} placeholder="Select a file..." disabled/>
    )
}

export default FileUpload;