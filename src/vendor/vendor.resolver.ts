import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { VendorService } from './vendor.service';
import { Vendor } from './entities/vendor.entity';
import { CreateVendorInput } from './dto/create-vendor.input';
import { UpdateVendorInput } from './dto/update-vendor.input';

@Resolver(() => Vendor)
export class VendorResolver {
  constructor(private readonly vendorService: VendorService) {}

  @Mutation(() => Vendor)
  createVendor(
    @Args('createVendorInput') createVendorInput: CreateVendorInput,
  ) {
    return this.vendorService.create(createVendorInput);
  }

  @Query(() => [Vendor], { name: 'findAllVendor' })
  findAllVendors(
    @Args('skip', { type: () => Int }) skip: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.vendorService.findAll(skip, limit);
  }

  @Query(() => Vendor, { name: 'findVendorById' })
  findById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.vendorService.findById(id);
  }

  @Mutation(() => Vendor)
  updateVendor(
    @Args('updateVendorInput') updateVendorInput: UpdateVendorInput,
  ) {
    return this.vendorService.update(updateVendorInput._id, updateVendorInput);
  }

  @Mutation(() => Vendor)
  removeVendor(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.vendorService.remove(id);
  }
}
