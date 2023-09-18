import { Controller, Post, UseGuards, Request, Body, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './local-auth.guard';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) 
  async register(@Body() user: User): Promise<User> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) 
  async login(@Request() req) {
    return this.authService.login(req.body.user);
  }

  @UseGuards(AuthGuard)
  @Get('users')
  @HttpCode(HttpStatus.OK) 
  findAll(): Promise<User[]> {
    return this.authService.findAll();
  }
}
