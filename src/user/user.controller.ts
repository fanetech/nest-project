import { UserService } from './user.service';
import { UserEntity } from './entites/user.entity';
import { UserSubscriberDto } from './dto/User-subscriber.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginCredentialDto } from './dto/login-credentials.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}


  @Post("register")
  async register(
    @Body() userData: UserSubscriberDto,
  ): Promise<Partial<UserEntity>> {
    return this.userService.register(userData);
  }


  @Post("login")
  async login(
    @Body() credential: LoginCredentialDto
  ): Promise<Partial<UserEntity>>{
    return this.userService.login(credential)
  }
}
