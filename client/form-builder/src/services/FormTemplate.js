// const axios = require('axios');
import axios from 'axios';

export async function getFormTemplateById(id) {
    let api_url = 'http://localhost:8080/formTemplate/' + id;
    try {
        const response = await axios.get(api_url);
        console.log('response  ', response)
        return response.data;
    } catch(error) {
        return error; 
    }
    
}