const BlockChain = require("./BlockChain");
const Bcain = new BlockChain();

Bcain.addBlock({ data: "First Borne" });
console.log(Bcain.Chain[1]);

let prevTStamp, nextTStamp, nextBlock, timeDiff, Avg;

const times = [];

for (let i = 0; i < 10000; i++) {
  prevTStamp = Bcain.Chain[Bcain.Chain.length - 1].timeStamp;

  Bcain.addBlock({ data: `Borne ${i}` });

  nextBlock = Bcain.Chain[Bcain.Chain.length - 1];

  nextTStamp = nextBlock.timeStamp;

  timeDiff = nextTStamp - prevTStamp;
  times.push(timeDiff);

  Avg = times.reduce((total, num) => total + num) / times.length;

  console.log(
    `Time to Mine Block:${timeDiff}ms. \tDifficulty:${nextBlock.difficulty}\tAverage time:${Avg}ms`
  );
}
