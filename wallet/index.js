const STARTING_BALANCE = require("../config").STARTING_BALANCE;
const { ec } = require("../util");
const cryptoHash = require("../util/CryptoHash");

class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE;

    this.keyPair = ec.genKeyPair();

    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  sign(data) {
    return this.keyPair.sign(cryptoHash(data));
  }
}

module.exports = Wallet;
