import { UserService } from './user.service';
import { UserEntity } from './entites/user.entity';
import { UserSubscriberDto } from './dto/User-subscriber.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async register(
    @Body() userData: UserSubscriberDto,
  ): Promise<Partial<UserEntity>> {
    return this.userService.register(userData);
  }
}
