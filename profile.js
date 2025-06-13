import { user } from './model.js';

const login = document.getElementById('login');

export function getProfile() {
    if (!user) {
        console.error('Not able to fetch data.');
        return;
    }

    if (login) {
        if (user.login && user.login !== 'Guest') {
            login.innerText = user.login;
        } else {
            login.innerText = 'Guest';
        }
    }


}

