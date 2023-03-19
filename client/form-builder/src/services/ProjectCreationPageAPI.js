import axios from 'axios';

export async function getVendorData() {
    const api_url = 'http://localhost:8080/api/admin/allUsers';
    try {
        const response = await axios.get(api_url);
        const userData = response.data;
        return userData.filter(function getVendor(ele) {
            return ele.role == "ROLE_VENDOR";
        })
    }
    
    catch (error) {
        console.log(error.message);
    }

}



export async function getFormTemplateData() {
    const api_url = 'http://localhost:8080/formTemplate/all';
    try {
        const response = await axios.get(api_url);
        const forms = response.data;
        return forms
    }
    
    catch (error) {
        console.log(error.message);
    }

}