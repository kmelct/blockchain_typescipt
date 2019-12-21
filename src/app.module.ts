// Core
import { Module } from '@nestjs/common';

import { ApiModule } from './modules/api';

@Module({
  imports: [ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
