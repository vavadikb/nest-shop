import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await argon2.verify(user.password, password))) {
      return user;
    }

    return null;
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async login(user: User) {
    const id = (await this.userRepository.findOne( {where:{ username:user.username}})).id
    const payload = { id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  async register(user: User): Promise<User> {
    const newUser = await this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
