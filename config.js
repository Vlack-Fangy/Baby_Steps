const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
  timeStamp: 1,
  lastHash: "$!@",
  hash: "hash_one",
  data: [],
  Nonce: 0,
  difficulty: INITIAL_DIFFICULTY,
};

const STARTING_BALANCE = 1000;

module.exports = {
  GENESIS_DATA,
  INITIAL_DIFFICULTY,
  MINE_RATE,
  STARTING_BALANCE,
};

// console.log(GENESIS_DATA.hash);//what the fuck---dbt 4
