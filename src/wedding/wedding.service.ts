import { Injectable } from '@nestjs/common';
import { CreateWeddingInput } from './dto/create-wedding.input';
import { UpdateWeddingInput } from './dto/update-wedding.input';
import { InjectModel } from '@nestjs/mongoose';
import { Wedding } from './entities/wedding.entity';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { UpdateWeddingMemberInput } from './dto/update-wedding-member.input';
import { UpdateWeddingHantaranInput } from './dto/update-wedding-hantaran.input';

@Injectable()
export class WeddingService {
  constructor(
    @InjectModel(Wedding.name) private weddingModel: Model<Wedding>,
  ) {}

  create(createWeddingInput: CreateWeddingInput): Promise<Wedding> {
    // if (
    //   createWeddingInput.bride &&
    //   this.weddingModel.findById(createWeddingInput.bride).exec()
    // ) {
    // }
    const createdWedding = new this.weddingModel(createWeddingInput);
    return createdWedding.save();
  }

  findAll(): Promise<Wedding[]> {
    return this.weddingModel.find().exec();
  }

  findById(id: MongooseSchema.Types.ObjectId) {
    return this.weddingModel.findById(id).exec();
  }

  updateGeneralInfo(
    id: MongooseSchema.Types.ObjectId,
    updateWeddingInput: UpdateWeddingInput,
  ): Promise<Wedding> {
    return this.weddingModel.findByIdAndUpdate(id, updateWeddingInput).exec();
  }

  updateMember(
    id: MongooseSchema.Types.ObjectId,
    updateWeddingMemberInput: UpdateWeddingMemberInput,
  ) {
    return this.weddingModel.findByIdAndUpdate(
      id,
      {
        $set: { member: updateWeddingMemberInput.member },
      },
      { new: true },
    );
  }

  updateHantaran(
    id: MongooseSchema.Types.ObjectId,
    updateWeddingHantaranInput: UpdateWeddingHantaranInput,
  ) {
    return this.weddingModel.findByIdAndUpdate(
      id,
      {
        $set: { hantaran: updateWeddingHantaranInput.hantaran },
      },
      { new: true },
    );
  }

  removeById(id: MongooseSchema.Types.ObjectId) {
    return this.weddingModel.deleteOne({ _id: id });
  }
}
