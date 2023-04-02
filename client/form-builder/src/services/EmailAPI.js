import axios from 'axios'; 

export async function sendCustomEmail(emailData) { 
    let api_url = 'http://localhost:8080/sendCustomEmail';
    try { 
        const response = await axios.post(api_url, emailData);
        console.log('response ', response); 
        return response.data;
    } catch(error) { 
        return error; 
    }
}