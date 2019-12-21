// Core
import { Controller, Get, Post, Body } from '@nestjs/common';

// Services
import { BlockchainService } from '../../blockchain';

// Dto
import { NewTransaction } from '../dto';

@Controller('blockchain')
export class ApiController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('/')
  async getBlockchain() {
    const data: any = this.blockchainService.getChain();

    return { success: true, data };
  }

  @Post('/mine')
  async mine() {
    const lastBlock = this.blockchainService.lastBlock();
    const lastProof = lastBlock.proof;
    const proof = this.blockchainService.proofOfWork(lastProof);

    // Create reward transaction
    this.blockchainService.newTransaction({
      sender: '0',
      recipient: process.env.NODE_ENV,
      amount: 1,
    });

    const previousHash = this.blockchainService.hash(lastProof);
    const newBlock: any = this.blockchainService.newBlock(proof, previousHash);

    return { success: true, data: newBlock };
  }

  @Post('/')
  async newTransaction(@Body() body: NewTransaction) {
    const { sender, recipient, amount } = body;

    const index = this.blockchainService.newTransaction({
      sender,
      recipient,
      amount,
    });

    return { success: true, index };
  }
}
