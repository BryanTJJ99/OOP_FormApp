import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

export function authRegister(username, name, email, password, role, country) {
    return axios.post(API_URL + 'createUser', {
        username,
        name,
        email,
        password,
        role, 
        country
    });
}

export function authLogIn(username, password) {
    return axios.post(API_URL + 'signin', {
            username,
            password
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        });
}

export function authLogOut() {
    localStorage.removeItem('user');
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

export function getCurrentUserRole() {
    return JSON.parse(localStorage.getItem('user')).role;
}
