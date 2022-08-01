import { Module } from '@nestjs/common';
import { FaneController } from './fane.controller';
import { FaneService } from './fane.service';

@Module({
  controllers: [FaneController],
  providers: [FaneService],
})
export class FaneModule {}
