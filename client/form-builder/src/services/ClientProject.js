import axios from 'axios';

export async function getAllProjects() {
    const api_url = 'http://localhost:8080/ClientProject/allProjects';
    try {
        const response = await axios.get(api_url);
        const allProjectsData = response.data;
        return allProjectsData;
    }

    catch (error) {
        console.log(error.message);
    }

}