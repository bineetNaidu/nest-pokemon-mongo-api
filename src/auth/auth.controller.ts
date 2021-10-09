import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userSrv: UserService) {}

  @Post('register')
  register(@Body() data: RegisterAuthDto) {
    return this.userSrv.create(data);
  }

  @Post('login')
  login(@Body() data: LoginAuthDto) {
    return this.userSrv.login(data);
  }
}
