import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) 
  async register(@Body() user: AuthDto): Promise<User> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) 
  async login(@Body() user: AuthDto) {
    return this.authService.login(user);
  }

}
