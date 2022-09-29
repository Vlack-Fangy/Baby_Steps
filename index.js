const bodyParser = require("body-parser");
const { response } = require("express");
const express = require("express");
const request = require("request");
const BlockChain = require("./BlockChain");
const PubSub = require("./pubsub");

const app = express();
const BlockChainie = new BlockChain();
const PubSubie = new PubSub({ blockchain: BlockChainie });

const Default_Port = 4000;
const Root_Node_Address = `http://localhost:${Default_Port}`;

app.use(bodyParser.json());

app.get("/api/blocks", (req, res) => {
  res.json(BlockChainie.Chain);
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;

  BlockChainie.addBlock({ data });

  PubSubie.broadcastChain();

  res.redirect("/api/blocks");
});

const SyncChain = () => {
  request(
    { url: `${Root_Node_Address}/api/blocks` },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const rootChain = JSON.parse(body);

        BlockChainie.replaceChain(rootChain);
        console.log("Sync \nReplaced with:", rootChain);
      }
    }
  );
}; //change to vid

let Peer_Port;

if (process.env.GENERATE_PEER_PORT === "true") {
  Peer_Port = Default_Port + Math.ceil(Math.random() * 1000);
}

const port = Peer_Port || Default_Port;
app.listen(port, () => {
  console.log(`Listenning to localHost:${port}`);

  if (port !== Default_Port) {
    SyncChain();
  }
});

//curl -v -H "Content-Type: application/json" -X POST \ -d "{\"data\":\"Bulbasaur\"}" http://localhost:4000/api/mine

//working-process.env.GENERATE_PEER_PORT === "true"

//curl -v -H "Content-Type: application/json" -X POST \ -d '{"data":"Bulbasaur"}' http://localhost:4000/api/mine

//dev-peer  -> cross-env GENERATE_PEER_PORT='true' nodemon index.js
