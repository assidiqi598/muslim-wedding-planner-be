import { Injectable } from '@nestjs/common';
import { CreateVendorInput } from './dto/create-vendor.input';
import { UpdateVendorInput } from './dto/update-vendor.input';
import { Vendor, VendorDocument } from './entities/vendor.entity';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VendorService {
  constructor(
    @InjectModel(Vendor.name)
    private vendorModel: Model<VendorDocument>,
  ) {}

  create(createVendorInput: CreateVendorInput): Promise<Vendor> {
    const createdVendor = new this.vendorModel(createVendorInput);
    return createdVendor.save();
  }

  findAll(skip: number = 0, limit: number = 10) {
    return this.vendorModel.find().skip(skip).limit(limit).exec();
  }

  findById(id: MongooseSchema.Types.ObjectId) {
    return this.vendorModel.findById(id).exec();
  }

  update(
    id: MongooseSchema.Types.ObjectId,
    updateVendorInput: UpdateVendorInput,
  ) {
    return this.vendorModel
      .findByIdAndUpdate(id, updateVendorInput, { new: true })
      .exec();
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return this.vendorModel.deleteOne({ _id: id });
  }
}
