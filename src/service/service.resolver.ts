import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { ServiceService } from './service.service';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(private readonly serviceService: ServiceService) {}

  @Mutation(() => Service)
  createService(
    @Args('createServiceInput') createServiceInput: CreateServiceInput,
  ) {
    return this.serviceService.create(createServiceInput);
  }

  @Query(() => [Service], { name: 'findAllServices' })
  findAll() {
    return this.serviceService.findAll();
  }

  @Query(() => Service, { name: 'findServiceById' })
  findServiceById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.serviceService.findById(id);
  }

  @Query(() => Service, { name: 'findServiceByName' })
  findServiceByName(@Args('name', { type: () => String }) name: String) {
    return this.serviceService.findByName(name);
  }

  @Mutation(() => Service)
  updateService(
    @Args('updateServiceInput') updateServiceInput: UpdateServiceInput,
  ) {
    return this.serviceService.update(
      updateServiceInput._id,
      updateServiceInput,
    );
  }

  @Mutation(() => Service)
  removeService(
    @Args('id', { type: () => Int }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.serviceService.remove(id);
  }
}
