import axios from 'axios';

export async function getFormTemplateById(id) {
    let api_url = 'http://localhost:8080/formTemplate/' + id;
    try {
        const response = await axios.get(api_url);
        console.log('response  ', response);
        return response.data;
    } catch(error) {
        return error; 
    }
}

export async function createFormTemplate(data) { 
    let api_url = 'http://localhost:8080/formTemplate/create';
    try { 
        const response = await axios.post(api_url, data);
        console.log('response ', response);
        return response.data
    } catch(error) { 
        return error;
    }
}

export async function getAllFormTemplate() {
    let api_url = 'http://localhost:8080/formTemplate/all';
    try {
        const response = await axios.get(api_url);
        console.log('response  ', response);
        return response.data;
    } catch(error) {
        return error; 
    }
}

export async function deleteFormTemplate(formTemplateId) {
    let api_url = 'http://localhost:8080/formTemplate/delete';
    var config = {
        headers: {
            'Content-Type': 'text/plain'
        }
    };    
    try {
        const response = await axios.post(api_url, formTemplateId, config);
        console.log('response  ', response);
        return response.data;
    } catch(error) {
        return error; 
    }
}