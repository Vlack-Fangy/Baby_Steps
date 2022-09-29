//By pubsub, we mean to creat a object with capabilities of both publisher and subscriber....so its publishing as well as listenning

const redis = require("redis");

const CHANNELS = {
  Test: "TEST",
  BLOCKCHAIN: "BLOCKCHAIN",
};

class PubSub {
  constructor({ blockchain }) {
    this.BlockChain = blockchain;

    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscribeToChannels();

    this.subscriber.on("message", (channel, message) => {
      this.handleMessage(channel, message);
    });
  }

  handleMessage(channel, message) {
    console.log(`Message Recieved. Channel: ${channel}. Message: ${message}`);

    const parseMessages = JSON.parse(message);

    if (channel == CHANNELS.BLOCKCHAIN) {
      this.BlockChain.replaceChain(parseMessages);
    }
  }

  subscribeToChannels() {
    Object.values(CHANNELS).forEach((channel) => {
      this.subscriber.subscribe(channel);
    });
  }

  publish({ channel, message }) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.BlockChain.Chain),
    });
  }
}

module.exports = PubSub;
