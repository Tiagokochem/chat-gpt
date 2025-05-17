import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async create(name: string): Promise<User> {
    const email = `${name.toLowerCase()}@fake.com`;

    let user = await this.userRepo.findOneBy({ email });

    if (user) return user;

    user = this.userRepo.create({ name, email });
    return this.userRepo.save(user);
  }
}
