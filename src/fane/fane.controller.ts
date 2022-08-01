import { FaneService } from './fane.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('fane')
export class FaneController {
  constructor(private FaneService: FaneService) {}
  @Get('/:name')
  getName(@Param('name') name: string): object {
    return this.FaneService.getName(name);
  }
}
