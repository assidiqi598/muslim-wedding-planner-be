import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model, Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  create(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findById(id: MongooseSchema.Types.ObjectId) {
    return this.userModel.findById(id);
  }

  updateById(
    id: MongooseSchema.Types.ObjectId,
    updateUserInput: UpdateUserInput,
  ) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true });
  }

  removeById(id: MongooseSchema.Types.ObjectId) {
    return this.userModel.deleteOne({ _id: id });
  }
}
