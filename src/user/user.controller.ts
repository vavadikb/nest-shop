import { Controller , Get, HttpCode, UseGuards, HttpStatus, Param, ParseIntPipe} from '@nestjs/common';
import { AuthGuard } from 'src/auth/local-auth.guard';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';


@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('')
    @HttpCode(HttpStatus.OK) 
    findAll(): Promise<User[]> {
      return this.userService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.userService.findOne(id);
        return user;
    }
}
