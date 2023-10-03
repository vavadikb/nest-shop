import { Injectable, NotFoundException} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}

      async findOne(id:number): Promise<User>{
        try {
          return await this.userRepository.findOneOrFail({ where: { id } });
        } catch (error) {
          throw new NotFoundException('User not found');
        }
      }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
      }
}
