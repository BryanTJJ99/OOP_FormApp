import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

export function authRegister(
    username,
    name,
    email,
    password,
    role,
    country,
    createdBy
) {
    return axios.post(API_URL + "createUser", {
        username,
        name,
        email,
        password,
        role,
        country,
        createdBy,
    });
}

export function authLogIn(username, password) {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
}

export function authLogOut() {
    sessionStorage.removeItem("user");
}

export function getCurrentUser() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
        return user;
    }
    return null;
}

export function getCurrentUserRole() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
        return user.roles[0];
    }
    return null;
}
