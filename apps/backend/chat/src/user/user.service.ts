import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async get(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    return user;
  }
  async addUser(createUser: CreateUserDto): Promise<User> {
    const newUser = await new this.userModel(createUser);
    return newUser.save();
  }
  async updateUser(userId: string, user: CreateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, user, {
      new: true
    });
    return updatedUser;
  }
  async deleteUser(userId: string): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    return deletedUser;
  }
}
