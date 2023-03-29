import axios from "axios";

export async function getVendorData() {
    const api_url = "http://localhost:8080/api/admin/allVendors";
    try {
        const response = await axios.get(api_url);
        const vendorData = response.data;
        return vendorData;
    } catch (error) {
        console.log(error.message);
    }
}

export async function getFormTemplateData() {
    const api_url = "http://localhost:8080/formTemplate/all";
    try {
        const response = await axios.get(api_url);
        const forms = response.data;
        return forms;
    } catch (error) {
        console.log(error.message);
    }
}

export async function getUserByUsername(username) {
    const api_url = "http://localhost:8080/api/admin/user/" + username;
    try {
        const response = await axios.get(api_url);
        const forms = response.data;
        return forms;
    } catch (error) {
        console.log(error.message);
    }
}

// export async function createProject(data) {
//     let api_url = 'http://localhost:8080/project/create';
//     try {
//         const response = await axios.post(api_url, data);
//         console.log('response ', response);
//         return response
//     } catch(error) {
//         return error;
//     }
// }

export async function createProject(data) {
    let api_url = "http://localhost:8080/project/create";
    try {
        const response = await axios.post(api_url, data);
        console.log("response ", response);
        return response.data;
    } catch (error) {
        return error;
    }
}
