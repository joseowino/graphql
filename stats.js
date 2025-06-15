const level = document.getElementById('level');

const elements = {
    level: document.getElementById('level'),
    role: document.getElementById('role'),
};

function setText(element, text) {
    if (element && text) {
        element.innerText = text;
    }
}

export function getStats(user) {
    // level
    const userLevel = user.level;
    setText(level, userLevel);
    

        // Role
    if (elements.role && user.level && user.events && Array.isArray(user.events.ranksDefinitions)) {
        const level = user.level;
        const ranks = user.events.ranksDefinitions;
        const rank = ranks
            .filter(r => r.level <= level)
            .sort((a, b) => b.level - a.level)[0];
        setText(elements.role, rank ? rank.name : '');
    }


}























