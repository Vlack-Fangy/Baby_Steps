const BlockChain = require("../BlockChain");
const Block = require("./block");
const CryptoHash = require("../util/CryptoHash");

describe("BlockChain", () => {
  let BlockChain0, newerBlockChain, OriginalChain0;

  beforeEach(() => {
    BlockChain0 = new BlockChain();
    newerBlockChain = new BlockChain();

    OriginalChain0 = BlockChain0.Chain;
  });

  it("contains a `Chain` ARRAY instance", () => {
    expect(BlockChain0.Chain instanceof Array).toBe(true);
  });

  it("starts with the Genesis Block", () => {
    expect(BlockChain0.Chain[0]).toEqual(Block.Genesis()); //Doubt-So all blockChains will have same Genesis?
  });

  it("Adds a new block to the chain", () => {
    const navin_Data = "navin-data";
    BlockChain0.addBlock({ data: navin_Data }); //why we gave the input of this as an obj is because we want to input a block as an input, altjough, we would only need its data

    expect(BlockChain0.Chain[BlockChain0.Chain.length - 1].data).toEqual(
      navin_Data
    );
  });

  describe("isValidChain()", () => {
    describe("when the Chain does not start with   Genesis Block", () => {
      it("returns false", () => {
        BlockChain0.Chain[0] = { data: "fake-Genesis" };

        expect(BlockChain.isValidChain(BlockChain0.Chain)).toBe(false);
      });
    });

    describe("When the Chain starts with Genesis Block, and has multiple Blocks", () => {
      beforeEach(() => {
        BlockChain0.addBlock({ data: "Charmander" });
        BlockChain0.addBlock({ data: "Charmalion" });
        BlockChain0.addBlock({ data: "Charlizard" });
      });

      describe("when the last hash reference has Changed", () => {
        it("returns false", () => {
          BlockChain0.Chain[2].lastHash = "Torterra";

          expect(BlockChain.isValidChain(BlockChain0.Chain)).toBe(false);
        });
      });

      describe("when the feild contains invalid info", () => {
        it("returns false", () => {
          BlockChain0.Chain[1].data = Date.now() + 1;

          expect(BlockChain.isValidChain(BlockChain0.Chain)).toBe(false);
        });
      });

      describe("and the chain contains a block with a jumped difficulty", () => {
        it("returns false", () => {
          const lastBlock = BlockChain0.Chain[BlockChain0.Chain.length - 1];

          const lastHash = lastBlock.hash;

          const timeStamp = Date.now();
          const Nonce = 0;
          const data = [];
          const difficulty = lastBlock.difficulty - 3;

          const hash = CryptoHash(timeStamp, lastHash, difficulty, Nonce, data);

          const Bad_Blocky = new Block({
            timeStamp,
            data,
            hash,
            Nonce,
            difficulty,
            lastHash,
          });

          BlockChain0.Chain.push(Bad_Blocky);

          expect(BlockChain.isValidChain(BlockChain0.Chain)).toBe(false);
        });
      });

      describe("Its all good", () => {
        it("rerturns true", () => {
          expect(BlockChain.isValidChain(BlockChain0.Chain)).toBe(true);
        });
      });
    });
  });

  describe("replaceChain()", () => {
    let errorMock, logMock;

    beforeEach(() => {
      errorMock = jest.fn();
      logMock = jest.fn();

      global.console.error = errorMock;
      global.console.log = logMock;
    });

    describe("When the new chain is not longer", () => {
      beforeEach(() => {
        newerBlockChain.Chain[0] = { new: "Chain" };

        BlockChain0.replaceChain(newerBlockChain.Chain);
      });

      it("it doesnt replace the chain", () => {
        expect(BlockChain0.Chain).toEqual(OriginalChain0); //dbt- why is it wrong?
      });

      it("logs an error", () => {
        expect(errorMock).toHaveBeenCalled();
      });
    });

    describe("When the new chain is Longer", () => {
      beforeEach(() => {
        newerBlockChain.addBlock({ data: "Charmander" });
        newerBlockChain.addBlock({ data: "Charmalion" });
        newerBlockChain.addBlock({ data: "Charlizard" });
      });

      describe("When the Chain is Invalid", () => {
        beforeEach(() => {
          newerBlockChain.Chain[2].hash = "Nine-tales";

          BlockChain0.replaceChain(newerBlockChain.Chain);
        });

        it("it doesnt replace the chain", () => {
          expect(BlockChain0.Chain).toEqual(OriginalChain0);
        });

        it("logs an error", () => {
          expect(errorMock).toHaveBeenCalled();
        });
      });

      describe("When the Chain is Valid", () => {
        beforeEach(() => {
          BlockChain0.replaceChain(newerBlockChain.Chain);
        });

        it("it replaces the chain", () => {
          expect(BlockChain0.Chain).toEqual(newerBlockChain.Chain);
        });

        it("logs an log", () => {
          expect(logMock).toHaveBeenCalled();
        });
      });
    });
  });
});
