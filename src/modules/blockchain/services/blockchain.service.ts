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

  public hash(block: IBlock) {
    const blockString = JSON.stringify(block);
    const hash = crypto
      .createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
      .update(blockString)
      .digest('hex');

    return hash;
  }

  public lastBlock() {
    const length = this.chain.length;
    return this.chain[length - 1];
  }
}
