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
  Req,
  UseGuards,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { UpdateDto } from './dto/Update-cv.dto';
import { JwtAuthGuard } from 'src/user/Guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from 'src/decorators/user.decorator';

@Controller('cv')

export class CvController {

  constructor(private cvService: CvService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllCvs(@User() user): Promise<CvEntity[]> {
   
    return await this.cvService.getCvs(user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addCv(@Body() addCvDto: AddCvDto, @Req() request:Request): Promise<CvEntity> {
    const user = request.user
    console.log(user)
    return await this.cvService.addCv(addCvDto, user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async updateCv(
    @Body() updateCvDto: UpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CvEntity> {
    return await this.cvService.updateCv(id, updateCvDto);
  }

  @Get('/remove/:id')
  @UseGuards(JwtAuthGuard)
  async recoverCv(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.removeCv(id);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCv(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.softDelete(id);
  }
}
