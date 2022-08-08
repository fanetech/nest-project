import { UserEntity } from './entites/user.entity';
import { Repository } from 'typeorm';
import { UserSubscriberDto } from './dto/User-subscriber.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginCredentialDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService:JwtService
  ) { }

  
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

  async login(credential: LoginCredentialDto) {
    const { username, password } = credential;
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.username= :username or user.email = :username', {
        username,
      })
      .getOne();
    if (!user) {
      throw new NotFoundException('identifiant inalide');
    }

    const hashedPassword = await bcrypt.hash(password, (await user).salt);
    if (hashedPassword === (await user).password) {
      const payload = {
        username,
        email: (await user).email,
        role: (await user).role,
      }
      const jwt = await this.jwtService.sign(payload)
      return {
        access_token:jwt
      }
    } else {
      throw new NotFoundException('identifiant inalide');
    }
  }
}
