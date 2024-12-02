import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { ServiceService } from './service.service';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(private readonly serviceService: ServiceService) {}

  @Mutation(() => Service)
  @UseGuards(JwtAuthGuard)
  createService(
    @Args('createServiceInput') createServiceInput: CreateServiceInput,
  ) {
    return this.serviceService.create(createServiceInput);
  }

  @Query(() => [Service], { name: 'findAllServices' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.serviceService.findAll();
  }

  @Query(() => Service, { name: 'findServiceById' })
  @UseGuards(JwtAuthGuard)
  findServiceById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.serviceService.findById(id);
  }

  @Query(() => Service, { name: 'findServiceByName' })
  @UseGuards(JwtAuthGuard)
  findServiceByName(@Args('name', { type: () => String }) name: String) {
    return this.serviceService.findByName(name);
  }

  @Mutation(() => Service)
  @UseGuards(JwtAuthGuard)
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
