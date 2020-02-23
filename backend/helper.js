
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChance(probability) {
    return (Math.random() < probability);
}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = { randomRange, randomChance, randomChoice }