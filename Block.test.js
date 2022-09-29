const HTB = require('hex-to-binary');
const Block = require('./Block');
const { GENESIS_DATA,  INITIAL_DIFFICULTY, MINE_RATE} = require('./config');
const CryptoHash = require('./CryptoHash');

describe('Harshal', () => {//() forms a callback fn       //name genesis
    const timeStamp = 2000;
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'decores']; 
    const Nonce = 0;
    const difficulty = INITIAL_DIFFICULTY;
    const block = new Block({ timeStamp, lastHash, hash, data, Nonce, difficulty });


    it('has a timestamp, lastHash, Nonce, difficulty, hash, data property', () => {
        expect(block.timeStamp).toEqual(timeStamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.Nonce).toEqual(Nonce);
        expect(block.difficulty).toEqual(difficulty);
    });

    describe('genesis()', () => {
        const genesisBlock = Block.Genesis();

        console.log('genesisBlock', genesisBlock);
        
        it('return a Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });

        describe('mineBlock()', () => {
            const lastBlock = Block.Genesis();
            const data = 'mined data';
            const minedBlock = Block.mineBlock({ lastBlock, data });
            
            it('Hogi Mine di', () => {
                expect(minedBlock instanceof Block).toBe(true);
            });


            it('Kya `lastHash` barabar `hash`, Haaaaa', () => {
                expect(minedBlock.lastHash).toEqual(lastBlock.hash);
            });

            it('', () => {
                expect(minedBlock.data).toEqual(data);
            })

            it('set a `timestamp`', () => {
                expect(minedBlock.timeStamp).not.toEqual(undefined);
            });

            it('Sargent! Difficulty up to `hash`, Sir!!', () => {
                expect(HTB(minedBlock.hash).substring(0, minedBlock.difficulty)).toEqual('0'.repeat(minedBlock.difficulty));
            });

            it('create a sha256 hash from inputs(proper)', () => {
                expect(minedBlock.hash).toEqual(
                    CryptoHash(
                        minedBlock.timeStamp,
                        lastBlock.hash,
                        minedBlock.Nonce,
                        minedBlock.data,
                        minedBlock.difficulty
                    )//change made - refer to vid 2
                );
            });

            it('adjusts the Difficulty', () => {
                const possibleResults = [lastBlock.difficulty + 1, lastBlock.difficulty - 1];

                expect(possibleResults.includes(minedBlock.difficulty)).toBe(true);
            });
        });
    });

    describe('AdjustDifficulty()', () => {
        it('raises the difficulty for a quickly mined block', () => {
            expect(Block.adjustDifficulty({ originalBlock: block, timeStamp: block.timeStamp + MINE_RATE - 100 })).toEqual(block.difficulty + 1);
        });

        it('lowers the difficulty for a Slowly mined blocks', () => {
            expect(Block.adjustDifficulty({ originalBlock: block, timeStamp: block.timeStamp + MINE_RATE + 100 })).toEqual(block.difficulty - 1);
        });

        it('has a lower limit of 1', () => {
            block.difficulty = -1;

            expect(Block.adjustDifficulty({ originalBlock: block })).toEqual(1);
        });
    });
});

