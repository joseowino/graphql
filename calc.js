export function setText(element, text) {
    if (element && text) {
        element.innerText = text;
    }
}

export function getRanks(user) {
    const userLevel = user.level;
    const ranks = user.events.ranksDefinitions;

    // Get current rank
    const currentRank = ranks
        .filter(r => r.level <= userLevel)
        .sort((a, b) => b.level - a.level)[0];

    // Get next rank
    const nextRank = ranks
        .filter(r => r.level > userLevel)
        .sort((a, b) => a.level - b.level)[0];

    return { currentRank, nextRank };
}


