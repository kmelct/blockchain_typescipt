// Core
import { Injectable } from '@nestjs/common';

// Utils
import * as crypto from 'crypto';

interface ITransaction {
  sender: string;
  recipient: string;
  amount: number;
}
interface IBlock {
  index: number;
  timestamp: number;
  transactions: ITransaction[];
  proof: number;
  previousHash: string;
}

@Injectable()
export class BlockchainService {
  private readonly chain: IBlock[] = [];
  private currentTransactions: ITransaction[] = [];

  public newBlock(proof: number, previousHash: string): IBlock {
    const block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.currentTransactions,
      proof,
      previousHash,
    };

    this.currentTransactions = [];
    this.chain.push(block);

    return block;
  }

  public newTransaction(transaction: ITransaction) {
    const { sender, recipient, amount } = transaction;

    this.currentTransactions.push({ sender, recipient, amount });

    return this.lastBlock().index;
  }

  public validProof(lastProof: number, proof: number) {
    const guessHash = crypto
      .createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
      .update(`${lastProof}${proof}`)
      .digest('hex');
    return guessHash.substr(0, 5) === process.env.RESOLUTION_HASH;
  }

  public proofOfWork(lastProof: number) {
    let proof = 0;
    while (true) {
      if (!this.validProof(lastProof, proof)) {
        proof++;
      } else {
        break;
      }
    }
    return proof;
  }

  public hash(block: IBlock) {
    const blockString = JSON.stringify(block);
    const hash = crypto
      .createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
      .update(blockString)
      .digest('hex');

    return hash;
  }

  public getChain(): any {
    return this.chain;
  }

  public lastBlock() {
    const length = this.chain.length;
    return this.chain[length - 1];
  }
}
