import { user } from "./model.js";
const level = document.getElementById('level');

export function getStats() {
    if (!user) {
        console.error('Not able to fetch data.');
        return;
    }

    if (level) {
        level.innerText = `Level: ${user.level}`;
    }


}























