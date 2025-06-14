import { user } from './model.js';

const login = document.getElementById('login');
const header = document.getElementById('header'); 
const welcome = document.getElementById('welcome');

export function getProfile() {
    if (!user) {
        console.error('Not able to fetch data.');
        return;
    }

    if (header) {
        if (user.campus && user.campus !== null) {
            const campusName = user.campus.charAt(0).toUpperCase() + user.campus.slice(1);
            header.innerText = `Zone01 ${campusName} Dashboard`;
        } 
    }

    if (welcome) {
        if (user.attrs.firstName) {
            welcome.innerText = `Welcome ${user.attrs.firstName}`;
        } 
    }

    if (login) {
        if (user.login && user.login !== 'Guest') {
            login.innerText = user.login;
        } else {
            login.innerText = 'Guest';
        }
    }


}

