import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { DeleteResult, Model, Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  // findAll(): Promise<User[]> {
  //   return this.userModel.find().exec();
  // }

  findById(id: MongooseSchema.Types.ObjectId): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  findByEmail(email: String): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  updateById(
    id: MongooseSchema.Types.ObjectId,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true });
  }

  async updateLastLogin(id: MongooseSchema.Types.ObjectId): Promise<Date> {
    const now = new Date();
    return (
      await this.userModel.findByIdAndUpdate(
        id,
        { lastLogin: now },
        { new: true },
      )
    ).lastLogin;
  }

  removeById(id: MongooseSchema.Types.ObjectId): Promise<DeleteResult> {
    return this.userModel.deleteOne({ _id: id });
  }
}
