import { Injectable } from '@nestjs/common';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { InjectModel } from '@nestjs/mongoose';
import { Service, ServiceDocument } from './entities/service.entity';
import { Model, Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<ServiceDocument>,
  ) {}

  create(createServiceInput: CreateServiceInput): Promise<Service> {
    const createdService = new this.serviceModel(createServiceInput);
    return createdService.save();
  }

  findAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }

  findById(id: MongooseSchema.Types.ObjectId): Promise<Service> {
    return this.serviceModel.findById(id).exec();
  }

  findByName(name: String): Promise<Service> {
    return this.serviceModel.findOne({ name }).exec();
  }

  update(
    id: MongooseSchema.Types.ObjectId,
    updateServiceInput: UpdateServiceInput,
  ) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
