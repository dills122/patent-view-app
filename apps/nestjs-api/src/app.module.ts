import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatentModule } from './patent/patent.module';

@Module({
  imports: [PatentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
