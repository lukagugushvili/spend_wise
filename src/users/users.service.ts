import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createUser = new this.userModel(createUserDto);
      const saveUser = createUser.save();
      return saveUser;
    } catch (e) {
      console.error('error creating user');
      throw new BadRequestException('Could not save user');
    }
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(email: string) {
    return this.userModel
      .findOne({ email })
      .select(['email', 'password'])
      .exec();
  }
}
