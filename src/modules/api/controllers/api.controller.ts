// Core
import { Controller, Get, Post, Body } from '@nestjs/common';

// Services
import { BlockchainService } from '../../blockchain';

@Controller('blockchain')
export class ApiController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('/')
  async getBlockchain() {
    const data = this.blockchainService.getChain();

    return { success: true, data };
  }

  @Post('/')
  async newTransaction(@Body() body) {
    const { sender, recipient, amount } = body;

    const index = this.blockchainService.newTransaction({
      sender,
      recipient,
      amount,
    });

    return { success: true, index };
  }
}
