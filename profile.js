import { user } from './model.js';

const header = document.getElementById('header'); 
const welcome = document.getElementById('welcome');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const country = document.getElementById('country');
const emagency = document.getElementById('emagency');
const gender = document.getElementById('gender')

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

    if (country) {
        if (user.attrs && user.attrs.country) {
            country.innerText = user.attrs.country;
        }
    }

    if (emagency) {
        if (user.attrs && user.attrs.emergencyTel) {
            emagency.innerText = user.attrs.emergencyTel;
        }
    }

        if (gender) {
        if (user.attrs && user.attrs.gender) {
            gender.innerText = user.attrs.gender;
        }
    }

    let level = user.level
    console.log("Level: ", level);
    // let currentRank = user.events.ranksDefinitions;
    // let rank = currentRank
    //     .filter(rank => rank.level <= level)
    //     .sort((a, b) => b.level - a.level)[0];
    // console.log("Current Rang: ", rank)


    // let nextRank = currentRank
    //     .filter(rank => rank.level > level)
    //     .sort((a, b) => a.level - b.level)[0];

}
















