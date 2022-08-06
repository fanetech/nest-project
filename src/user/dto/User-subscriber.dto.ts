import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserSubscriberDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
