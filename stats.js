const level = document.getElementById('level');

const elements = {
    level: document.getElementById('level'),
    role: document.getElementById('role'),
    nextRank: document.getElementById('nextRank'),
    xp: document.getElementById('xp'),
    ouditRatio: document.getElementById('auditRatio'),
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
    
    // Ranks
    if (elements.role && user.level && user.events && Array.isArray(user.events.ranksDefinitions)) {
        const ranks = user.events.ranksDefinitions;
        const rank = ranks
            .filter(r => r.level <= userLevel)
            .sort((a, b) => b.level - a.level)[0];
        setText(elements.role, rank ? rank.name : '');

        const nextRank = ranks
            .filter(r => r.level > userLevel)
            .sort((a, b) => a.level - b.level)[0];
        setText(elements.nextRank, nextRank ? nextRank.name : '');
    }

    // XP
    if (elements.xp && user.totalXP && Array.isArray(user.totalXP)) {
        const totalXPs = user.totalXP.reduce((totalXPs, transaction) => {
            return transaction.type === "xp" ? totalXPs + transaction.amount : totalXPs;
        }, 0);
        setText(elements.xp, totalXPs.toLocaleString());
    }

    // Oudit Ratio
    if (elements.ouditRatio && user.upTransactions && user.downTransactions) {
        const upCount = user.upTransactions.reduce((count, transaction) => count + transaction.amount, 0);
        const downCount = user.downTransactions.reduce((count, transaction) => count + transaction.amount, 0);
        const ratio = downCount > 0 ? (upCount / downCount).toFixed(2) : '∞';
        setText(elements.ouditRatio, ratio);
    }

}























