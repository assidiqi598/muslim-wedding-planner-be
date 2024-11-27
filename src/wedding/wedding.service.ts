import { Injectable } from '@nestjs/common';
import { CreateWeddingInput } from './dto/create-wedding.input';
import { UpdateWeddingInput } from './dto/update-wedding.input';
import { InjectModel } from '@nestjs/mongoose';
import { Wedding } from './entities/wedding.entity';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { UpdateWeddingMemberInput } from './dto/update-wedding-member.input';
import { UpdateWeddingHantaranInput } from './dto/update-wedding-hantaran.input';
import { UpdateWeddingVendorInput } from './dto/update-wedding-vendor.input';

@Injectable()
export class WeddingService {
  constructor(
    @InjectModel(Wedding.name) private weddingModel: Model<Wedding>,
  ) {}

  create(createWeddingInput: CreateWeddingInput): Promise<Wedding> {
    const createdWedding = new this.weddingModel(createWeddingInput);
    return createdWedding.save();
  }

  findAll(skip: number = 0, limit: number = 10): Promise<Wedding[]> {
    return this.weddingModel.find().skip(skip).limit(limit).exec();
  }

  findById(id: MongooseSchema.Types.ObjectId): Promise<Wedding> {
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
    return this.weddingModel
      .findByIdAndUpdate(
        id,
        {
          $set: { member: updateWeddingMemberInput.member },
        },
        { new: true },
      )
      .exec();
  }

  updateHantaran(
    id: MongooseSchema.Types.ObjectId,
    updateWeddingHantaranInput: UpdateWeddingHantaranInput,
  ) {
    return this.weddingModel
      .findByIdAndUpdate(
        id,
        {
          $set: { hantaran: updateWeddingHantaranInput.hantaran },
        },
        { new: true },
      )
      .exec();
  }

  updateVendor(
    id: MongooseSchema.Types.ObjectId,
    updateWeddingVendorInput: UpdateWeddingVendorInput,
  ) {
    return this.weddingModel
      .findByIdAndUpdate(
        id,
        {
          $set: { vendors: updateWeddingVendorInput.vendors },
        },
        { new: true },
      )
      .exec();
  }

  removeById(id: MongooseSchema.Types.ObjectId) {
    return this.weddingModel.deleteOne({ _id: id });
  }
}
