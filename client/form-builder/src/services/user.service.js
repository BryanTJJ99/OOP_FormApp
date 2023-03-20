import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserBoard = () => {
    return axios.get(API_URL + "user", {
        headers: authHeader()
    });
};

const getVendorBoard = () => {
    return axios.get(API_URL + "vendor", {
        headers: authHeader()
    });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", {
        headers: authHeader()
    });
};

const getApproverBoard = () => {
    return axios.get(API_URL + "approver", {
        headers: authHeader()
    });
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getVendorBoard,
    getAdminBoard,
    getApproverBoard
};

export default UserService;