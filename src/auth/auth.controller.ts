import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './local-auth.guard';
import { AuthGuard } from './local-auth.guard';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private registrationService: AuthService) {}


  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.registrationService.register(user);
  }

  @Post('login')
  async login(@Request() req) {
    console.log(req.body)
    return this.authService.login(req.body.user);
  }

  @UseGuards(AuthGuard)
  @Get('users')
  findAll(): Promise<User[]> {
    return this.authService.findAll();
  }

}
