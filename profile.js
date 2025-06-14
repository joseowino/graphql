import { user } from './model.js';

const header = document.getElementById('header'); 
const welcome = document.getElementById('welcome');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

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
        if (user.firstName) {
            welcome.innerText = `Welcome ${user.firstName}`;
        } 
    }

    if (name) {
        if (user.firstName) {
            name.innerText = user.firstName;
        } 

        if (user.lastName) {
            name.innerText += ` ${user.lastName}`;
        }
    }

    if (email) {
        if (user.email) {
            email.innerText = user.email;
        } 
    }

    if (phone) {
        if (user.attrs && user.attrs.phone) {
            phone.innerText = user.attrs.phone;
        }
    }


}
















