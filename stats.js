import { setText, getRanks } from "./calc.js";

const elements = {
    level: document.getElementById('level'),
    role: document.getElementById('role'),
    nextRank: document.getElementById('nextRank'),
    xp: document.getElementById('xp'),
    ouditRatio: document.getElementById('auditRatio'),
};

export function getStats(user) {
    // level
    const userLevel = user.level;
    setText(level, userLevel);
    
    // Ranks
    if (elements.role && user.level && user.events && Array.isArray(user.events.ranksDefinitions)) {
        const { currentRank, nextRank } = getRanks(user);
        setText(elements.role, currentRank ? currentRank.name : 'No Rank');
        setText(elements.nextRank, nextRank ? nextRank.name : 'No Next Rank');
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























