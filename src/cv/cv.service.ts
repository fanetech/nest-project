import { UpdateDto } from './dto/Update-cv.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/Add-cv.dto';
import { CvEntity } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {}
  async getCvs(): Promise<CvEntity[]> {
    return await this.cvRepository.find();
  }

  async addCv(cv: AddCvDto): Promise<CvEntity> {
    return await this.cvRepository.save(cv);
  }
  async updateCv(id: number, cv: UpdateDto): Promise<CvEntity> {
    const newCv = await this.cvRepository.preload({
      id,
      ...cv,
    });
    if (!newCv) {
      throw new NotFoundException('Cv inconnu');
    }
    return await this.cvRepository.save(newCv);
  }
  updateCv2(updateCreateria, cv: UpdateDto) {
    return this.cvRepository.update(updateCreateria, cv);
  }
}
