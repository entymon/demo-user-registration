import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserRequest } from './dto/create-user.request';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(
    data: CreateUserRequest,
  ): Promise<Pick<UserDocument, 'email' | 'name'>> {
    const exist = await this.getUserByEmail(data.email);
    if (exist) {
      throw new UnprocessableEntityException(
        'User with this email already exists',
      );
    }

    const password = this.simpleHash(data.password);
    const newUser = new this.userModel({
      name: data.name,
      email: data.email,
      password,
    });
    const user = await newUser.save();
    return {
      email: user.email,
      name: user.name,
    };
  }

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  private simpleHash(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
  }

  getHello(): string {
    return 'Hello World Test!';
  }
}
