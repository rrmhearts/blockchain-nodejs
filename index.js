const sha256 = require('sha256');

class Block {
  constructor(index, timestamp, data, lastHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.lastHash = lastHash;
    this.nonce = Math.random();
    this.hash = sha256(
      this.index + this.timestamp + this.data + this.lastHash + this.nonce
    );
  }
}

class Blockchain {
    constructor() {
        const genesis = new Block(0, Date.now(), 'Genesis Block', '0');
        this.chain = [genesis];
    }

    addBlock(data, prevBlock = this.chain[this.chain.length-1]) {
        let block;
        do {
            block = new Block(prevBlock.index+1, Date.now(), data, prevBlock.hash);

        } while (!this.verify(block));
        
        this.chain.push(block);
    }

    verify(block) {
        if (block.hash > '00005d77d925e6687b6912c20c3d6026bc503c9a15b364a971e78d99e31d513f')
            return false
        return true;
    }

    timer(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
}

const fooBlockChain = new Blockchain();
fooBlockChain.addBlock('First Block');
fooBlockChain.addBlock('Second Block');
fooBlockChain.addBlock('Third Block');

console.log(fooBlockChain);
