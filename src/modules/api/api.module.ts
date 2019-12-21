// Core
import { Module } from '@nestjs/common';

// Services
import { BlockChainModule } from '../blockchain';

// Controllers
import { ApiController } from './controllers';

@Module({
  imports: [BlockChainModule],
  controllers: [ApiController],
})
export class ApiModule {}
