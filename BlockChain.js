const Block = require("./Block");
const Blocky = require("./Block");
const CryptoHash = require("./CryptoHash");

class BlockChain {
  constructor() {
    this.Chain = [Blocky.Genesis()];
  }

  addBlock({ data }) {
    //here the input could be an obj/block or just a data feild, (but we wish for Block) So, here we take it in an object manner to make it more fexible, as decided in BlockChain.test.js
    this.Chain[this.Chain.length] = Block.mineBlock({
      lastBlock: this.Chain[this.Chain.length - 1],
      data,
    });
  }

  static isValidChain(Chainy) {
    if (JSON.stringify(Chainy[0]) !== JSON.stringify(Block.Genesis()))
      return false;

    for (let i = 1; i < Chainy.length; i++) {
      const lastDifficulty = Chainy[i - 1].difficulty;
      if (Chainy[i - 1].hash != Chainy[i].lastHash) return false;

      const { timeStamp, lastHash, hash, data, Nonce, difficulty } = Chainy[i];

      if (hash !== CryptoHash(timeStamp, lastHash, data, Nonce, difficulty))
        return false;

      if (Math.abs(lastDifficulty - difficulty) > 1) return false;
    }

    return true;
  }

  replaceChain(Chainy) {
    if (Chainy.length <= this.Chain.length) {
      console.error("!The incoming Chain must be longer");
      return;
    }

    if (!BlockChain.isValidChain(Chainy)) {
      console.error("!The incoming Chain must be Valid");
      return;
    }

    console.log("replacing Chain with", Chainy);
    this.Chain = Chainy;
  }
}

module.exports = BlockChain;
