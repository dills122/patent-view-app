import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PatentModule } from './patent/patent.module';

@Module({
  imports: [ConfigModule.forRoot(), PatentModule],
  controllers: [],
  providers: []
})
export class AppModule {}
