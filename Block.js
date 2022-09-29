const HTB = require('hex-to-binary');
const { GENESIS_DATA, MINE_RATE } = require('./config.js');        
const CryptoHash = require('./CryptoHash');

class Block {
    constructor({ timeStamp, lastHash, hash, data, Nonce, difficulty }) {
        this.timeStamp = timeStamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.Nonce = Nonce;
        this.difficulty = difficulty;

        //console.log(this.Nonce);//Showing nonce is undefined
    }

    static Genesis() {//why are we making such an memory inefficient function-dbt 3
        return new this( GENESIS_DATA );
    }

    static mineBlock({ lastBlock, data }) {
        let hash, timeStamp;
        //const timeStamp = Date.now();
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let Nonce = 0;

        do {
            timeStamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timeStamp });
            hash = CryptoHash(timeStamp, lastHash, data, Nonce, difficulty);
            Nonce++;
        } while (HTB(hash).substring(0, difficulty) !== '0'.repeat(difficulty));
        
        Nonce--;

        return new this({
            timeStamp,
            lastHash,
            data,
            difficulty,
            Nonce,
            hash
            //hash : CryptoHash(timeStamp, lastHash, data, Nonce, difficulty)
        });         
    };

    static adjustDifficulty({ originalBlock, timeStamp }) {
        const { difficulty } = originalBlock;

        if (difficulty < 1)
            return 1;

        if ((timeStamp - originalBlock.timeStamp) > MINE_RATE)
            return (difficulty - 1);

        return difficulty + 1;
    }
}

console.log(GENESIS_DATA.timeStamp);//fuck- dbt 6

// const fooblock = new Block({
//     data: 'foo-data',
//     lastHash: 'foo-lastHash',
//     hash: 'foo-hash',
//     timeStamp: '01/01/01'
// });



module.exports = Block;

// console.log('fooBlock:', fooblock);