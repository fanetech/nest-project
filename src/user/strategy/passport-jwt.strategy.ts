import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {ConfigService} from "@nestjs/config"
import { PayloadInterface } from '../interfaces/payload.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../entites/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRpository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("SECRET"),
    });
  }

  async validate(payload: PayloadInterface) {
    const userFind = await this.userRpository.findOne({ 
        where: { 
          username: payload.username 
        } 
      })

    if(userFind){
      const {password, salt, ...user} = userFind
      return user
    }else{
      throw new UnauthorizedException("Utilisateur nos authentifier")
    }
  }
}