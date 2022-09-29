const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
    timeStamp: 1,
    lastHash: '$!@',
    hash:'hash_one',
    data: [],
    Nonce:0,
    difficulty:INITIAL_DIFFICULTY
};

module.exports = {GENESIS_DATA, INITIAL_DIFFICULTY, MINE_RATE};

// console.log(GENESIS_DATA.hash);//what the fuck---dbt 4