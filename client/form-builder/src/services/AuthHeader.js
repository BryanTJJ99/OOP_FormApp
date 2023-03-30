export default function AuthHeader() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}

// this will be used later time to test out the JWT Access Token to the respective pages assigned to the user