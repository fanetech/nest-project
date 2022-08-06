import { UserEntity } from './entites/user.entity';
import { Repository } from 'typeorm';
import { UserSubscriberDto } from './dto/User-subscriber.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async register(userData: UserSubscriberDto): Promise<Partial<UserEntity>> {
    const user = this.userRepository.create({ ...userData });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRepository.save(user);
    } catch (err) {
      throw new ConflictException('email et mot de passe invalide');
    }
    delete user.password;
    delete user.salt;
    return user;
  }
}
