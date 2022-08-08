import { UserService } from './user.service';
import { UserEntity } from './entites/user.entity';
import { UserSubscriberDto } from './dto/User-subscriber.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginCredentialDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private jwtService: JwtService) {}


  @Post("register")
  async register(
    @Body() userData: UserSubscriberDto,
  ): Promise<Partial<UserEntity>> {
    return this.userService.register(userData);
  }


  @Post("login")
  async login(
    @Body() credential: LoginCredentialDto
  ){
    return this.userService.login(credential)
  }
}
