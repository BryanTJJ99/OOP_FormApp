import axios from 'axios';

export async function getProjectById(id) {
    let api_url = 'http://localhost:8080/project/' + id;
    try {
        const response = await axios.get(api_url);
        // console.log('response  ', response);
        return response.data;
    } catch(error) {
        return error; 
    }
}


export async function updateProject(project) {
    let api_url = 'http://localhost:8080/project/updateProject';
    try {
        const response = await axios.put(api_url, project);
        console.log('response  ', response);
        return response.data;
    } catch(error) {
        return error; 
    }
}
