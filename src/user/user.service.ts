import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_MODEL_NAME } from 'src/shared/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDoc } from './model/user.model';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL_NAME) private readonly userRepo: Model<UserDoc>,
  ) {}

  async create(data: CreateUserDto): Promise<UserDoc> {
    try {
      const user = new this.userRepo(data);
      await user.save();
      return user;
    } catch (error) {
      const fmtErrors = {
        errors: !error.message.match(/E11000 duplicate key/gi)
          ? Object.keys(error.errors).map((key) => {
              return {
                field: key,
                message: `${key} is required!`,
              };
            })
          : [
              {
                field: 'username',
                message: 'Either username OR email already exists!',
              },
            ],
      };

      throw new HttpException(fmtErrors, HttpStatus.BAD_REQUEST);
    }
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

  async login(data: { email: string; password: string }): Promise<UserDoc> {
    const user = await this.userRepo.findOne({ email: data.email });
    if (!user) {
      throw new HttpException(
        'User with that email dont exists',
        HttpStatus.NOT_FOUND,
      );
    }
    const isValidPassword = await argon.verify(user.password, data.password);
    if (isValidPassword) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
