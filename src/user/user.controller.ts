import { UserService } from './user.service';
import { UserEntity } from './entites/user.entity';
import { UserSubscriberDto } from './dto/User-subscriber.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginCredentialDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private jwtService: JwtService) {}


  @Get()
  async getAllUser():Promise<UserEntity[]>{
    return await this.userService.getAllUser()
  }
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

  @Get("test")
  async test(){
    return "test"
  }
}
