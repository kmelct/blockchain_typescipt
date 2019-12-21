// Core
import { Module } from '@nestjs/common';

// Services
import { BlockchainService } from './services';

@Module({
  providers: [BlockchainService],
  exports: [BlockchainService],
})
export class BlockChainModule {}
