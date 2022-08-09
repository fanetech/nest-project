/* eslint-disable prettier/prettier */
import { UserEntity } from './entites/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv"
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { ConfigModule } from '@nestjs/config';
dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [UserEntity],
     
    ), PassportModule.register({
        defaultStrategy: 'jwt',
      }),
      JwtModule.register({
      secret: process.env.SECRET,
      signOptions:{
        expiresIn:3600
      }
    }),
    ConfigModule
    
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
