import { setText } from "./calc.js";

const elements = {
    header: document.getElementById('header'),
    welcome: document.getElementById('welcome'),
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    country: document.getElementById('country'),
    emagency: document.getElementById('emagency'),
    gender: document.getElementById('gender'),
    login: document.getElementById('login'),
};

export function getProfile(user) {
    if (!user) {
        console.error('Not able to fetch data.');
        return;
    }

    // Header
    if (user.campus) {
        const campusName = user.campus.charAt(0).toUpperCase() + user.campus.slice(1);
        setText(elements.header, `Zone01 ${campusName} Dashboard`);
    }

    // Welcome
    setText(elements.welcome, user.firstName ? `Welcome ${user.firstName}` : '');

    // Name
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
    setText(elements.name, fullName);

    // Login
    setText(elements.login, "@" + user.login || 'Guest');

    // Email
    setText(elements.email, user.email);

    // Phone, Country, Emergency, Gender
    if (user.attrs) {
        setText(elements.phone, user.attrs.phone);
        setText(elements.country, user.attrs.country);
        setText(elements.emagency, user.attrs.emergencyTel);
        setText(elements.gender, user.attrs.gender);
    }

}
















