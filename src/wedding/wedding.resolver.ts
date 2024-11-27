import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WeddingService } from './wedding.service';
import { Wedding } from './entities/wedding.entity';
import { CreateWeddingInput } from './dto/create-wedding.input';
import { UpdateWeddingInput } from './dto/update-wedding.input';
import { Schema as MongooseSchema } from 'mongoose';
import { UpdateWeddingMemberInput } from './dto/update-wedding-member.input';
import { UpdateWeddingHantaranInput } from './dto/update-wedding-hantaran.input';
import { UpdateWeddingVendorInput } from './dto/update-wedding-vendor.input';

@Resolver(() => Wedding)
export class WeddingResolver {
  constructor(private readonly weddingService: WeddingService) {}

  @Mutation(() => String)
  async createWedding(
    @Args('createWeddingInput') createWeddingInput: CreateWeddingInput,
  ) {
    return (
      await this.weddingService.create(createWeddingInput)
    )._id.toString();
  }

  @Query(() => [Wedding], { name: 'findAllWeddings' })
  findAllWeddings(
    @Args('skip', { type: () => Int }) skip: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.weddingService.findAll(skip, limit);
  }

  @Query(() => Wedding, { name: 'findWeddingById' })
  findWeddingById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.weddingService.findById(id);
  }

  @Mutation(() => Boolean)
  async updateWeddingInfo(
    @Args('updateWeddingInput') updateWeddingInput: UpdateWeddingInput,
  ) {
    return (
      (
        await this.weddingService.updateGeneralInfo(
          updateWeddingInput._id,
          updateWeddingInput,
        )
      )._id !== undefined
    );
  }

  @Mutation(() => Boolean)
  updateWeddingMember(
    @Args('updateWeddingMemberInput')
    updateWeddingMemberInput: UpdateWeddingMemberInput,
  ) {
    const ret = this.weddingService.updateMember(
      updateWeddingMemberInput._id,
      updateWeddingMemberInput,
    );

    console.log('ret', ret);

    return ret;
  }

  @Mutation(() => Boolean)
  updateWeddingHantaran(
    @Args('updateWeddingHantaranInput')
    updateWeddingHantaranInput: UpdateWeddingHantaranInput,
  ) {
    return this.weddingService.updateHantaran(
      updateWeddingHantaranInput._id,
      updateWeddingHantaranInput,
    );
  }

  @Mutation(() => Boolean)
  updateWeddingVendor(
    @Args('updateWeddingVendorInput')
    updateWeddingVendorInput: UpdateWeddingVendorInput,
  ) {
    return this.weddingService.updateVendor(
      updateWeddingVendorInput._id,
      updateWeddingVendorInput,
    );
  }

  @Mutation(() => Boolean)
  removeWedding(
    @Args('id', { type: () => Int }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.weddingService.removeById(id);
  }
}
