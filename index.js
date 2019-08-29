const sha256 = require('sha256');

class Block {
  constructor(index, timestamp, data, lastHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.lastHash = lastHash;
    this.hash = sha256(
      this.index + this.timestamp + this.data + this.lastHash
    );
  }
}

class Blockchain {
    constructor() {
        const genesis = new Block(0, Date.now(), 'Genesis Block', '0');
        this.chain = [genesis];
    }

    addBlock(data, prevBlock = this.chain[this.chain.length-1]) {
        const block = new Block(prevBlock.index+1, Date.now(), data, prevBlock.hash);

        this.chain.push(block);
    }

    timer(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
}

//async function test() {
    const fooBlockChain = new Blockchain();
    fooBlockChain.addBlock('First Block');
    //await fooBlockChain.timer(1500);
    fooBlockChain.addBlock('Second Block');
    //await fooBlockChain.timer(1500);
    fooBlockChain.addBlock('Third Block');

    console.log(fooBlockChain);
//}