import axios from 'axios';

export async function getAllUsers() { 
    let api_url = 'http://localhost:8080/api/admin/allUsers'; 
    try { 
        const response = await axios.get(api_url); 
        console.log('response ', response); 
        return response.data; 
    } catch(error) { 
        return error; 
    }
}

export async function getUserById(id) { 
    let api_url = `http://localhost:8080/api/admin/user/id?id=${id}`; 
    try { 
        const response = await axios.get(api_url);
        console.log(response);
        return response.data; 
    } catch(error) { 
        return error; 
    }
}