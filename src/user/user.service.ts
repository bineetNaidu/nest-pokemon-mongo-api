import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDoc } from './model/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: Model<UserDoc>) {}

  async create(data: CreateUserDto): Promise<UserDoc> {
    const user = new this.userRepo(data);
    await user.save();
    return user;
  }

  async findAll(): Promise<UserDoc[]> {
    const users = await this.userRepo.find();
    return users;
  }

  async findOne(id: string): Promise<UserDoc> {
    const user = await this.userRepo.findById(id);
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.userRepo.findById(id);
    user.set(data);
    await user.save();
    return user;
  }

  async remove(id: string): Promise<boolean> {
    try {
      const user = await this.userRepo.findById(id);
      await user.remove();
      return true;
    } catch (error) {
      return false;
    }
  }
}
