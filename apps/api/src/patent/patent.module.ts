import { Module } from '@nestjs/common';
import { PatentController } from './controller/patent/patent.controller';

@Module({
  controllers: [PatentController]
})
export class PatentModule {}
