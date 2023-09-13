import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './local-auth.guard';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body.user);
  }

  @UseGuards(AuthGuard)
  @Get('users')
  findAll(): Promise<User[]> {
    return this.authService.findAll();
  }

}
