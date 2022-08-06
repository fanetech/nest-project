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

  async findCvById(id) {
    const cv = await this.cvRepository.findOne(id);
    if (!cv) {
      throw new NotFoundException('cv inconnu');
    }
    return cv;
  }
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

  async removeCv(id) {
    const cvToRemove = await this.findCvById(id);
    return await this.cvRepository.remove(cvToRemove);
  }
  async removeCv2(id: number) {
    return this.cvRepository.delete(id);
  }

  async softRemove(id) {
    const cvToremove = await this.findCvById(id);

    return await this.cvRepository.softRemove(cvToremove);
  }
  async recoverCv(id) {
    return await this.cvRepository.restore(id);
  }
  async softDelete(id) {
    return this.cvRepository.softDelete(id);
  }

  //custom request
  async statCvNumberByAge(maxAge, minAge = 0) {
    const qb = this.cvRepository.createQueryBuilder('cv');

    qb.select('cv.age , count(cv.id) as nomberDeCv')
      .where('cv.age > :minAge and cv.age < :maxAge')
      .setParameters({ maxAge, minAge })
      .groupBy('cv.age');
    console.log(qb.getSql());
    return await qb.getRawMany();
  }
}
