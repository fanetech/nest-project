import { AddCvDto } from './dto/Add-cv.dto';
import { CvEntity } from './entities/cv.entity';
import {
  Body,
  Controller,
  Delete,
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

  @Patch()
  async updateCv2(@Body() updateObject) {
    return await this.cvService.updateCv2(
      updateObject.updateCreateria,
      updateObject.updateCvDto,
    );
  }

  // @Get('stat')
  // async statsCvNumberByAge() {
  //   return this.cvService.statCvNumberByAge();
  // }
  @Get('stat2')
  async statsCvNumberByAge2() {
    return this.cvService.statCvNumberByAge(50, 18);
  }

  @Get(':id')
  async getCv(@Param('id', ParseIntPipe) id: number): Promise<CvEntity> {
    return await this.cvService.findCvById(id);
  }

  @Patch(':id')
  async updateCv(
    @Body() updateCvDto: UpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CvEntity> {
    return await this.cvService.updateCv(id, updateCvDto);
  }

  @Get('/remove/:id')
  async recoverCv(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.removeCv(id);
  }
  @Delete(':id')
  async deleteCv(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.softDelete(id);
  }
}
