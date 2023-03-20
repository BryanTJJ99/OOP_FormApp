import axios from 'axios'

export async function getAllVendors(){
    const api_url = "http://localhost:8080/api/admin/allVendors"
    try {
        const response = await axios.get(api_url)
        return response.data;
    }
    
    catch (error) {
        console.log('error is: '+error.message);
    }
}

export async function getAllProjects(){
    const api_url = "http://localhost:8080/project/allProjects"
    try {
        const response = await axios.get(api_url);
        return response.data;
    }
    
    catch (error) {
        console.log(error.message);
    }
}

export async function getAllFormResponses(){
    const api_url = "http://localhost:8080/formResponse/all"
    try {
        const response = await axios.get(api_url);
        return response.data;
    }
    
    catch (error) {
        console.log(error.message);
    }
}