import axios from 'axios';

export async function getFormResponseById(id) {
    let api_url = 'http://localhost:8080/formResponse/' + id; 
    try { 
        const response = await axios.get(api_url); 
        console.log('resopnse ', response); 
        return response.data;
    } catch(error) { 
        return error; 
    }
} 

export async function createFormResponse(formData) { 
    let api_url = 'http://localhost:8080/formResponse/create'; 
    try { 
        const response = await axios.post(api_url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        console.log('response ', response); 
        return response.data;
    } catch(error) { 
        return error; 
    }
}

// export async function updateFilesInFormAnswer(fileMap, id) { 
//     let api_url = 'http://localhost:8080/formResponse/updateFiles/' + id;
//     try { 
//         const response = await axios.post(api_url, fileMap);
//         console.log('response ', response); 
//         return response.data; 
//     } catch(error) { 
//         return error;
//     }
// }