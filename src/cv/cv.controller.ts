import { AddCvDto } from './dto/Add-cv.dto';
import { CvEntity } from './entities/cv.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { UpdateDto } from './dto/Update-cv.dto';

@Controller('cv')
export class CvController {
  constructor(private cvService: CvService) {}

  @Get()
  async getAllCvs(): Promise<CvEntity[]> {
    return await this.cvService.getCvs();
  }

  @Post()
  async addCv(@Body() addCvDto: AddCvDto): Promise<CvEntity> {
    return await this.cvService.addCv(addCvDto);
  }
  @Patch(':id')
  async updateCv(
    @Body() updateCvDto: UpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CvEntity> {
    return await this.cvService.updateCv(id, updateCvDto);
  }
}
