import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { WeddingService } from './wedding.service';
import { Wedding } from './entities/wedding.entity';
import { CreateWeddingInput } from './dto/create-wedding.input';
import { UpdateWeddingInput } from './dto/update-wedding.input';
import { Schema as MongooseSchema } from 'mongoose';
import { UpdateWeddingMemberInput } from './dto/update-wedding-member.input';
import { UpdateWeddingHantaranInput } from './dto/update-wedding-hantaran.input';
import { UpdateWeddingVendorInput } from './dto/update-wedding-vendor.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Wedding)
export class WeddingResolver {
  constructor(private readonly weddingService: WeddingService) {}

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async createWedding(
    @Args('createWeddingInput') createWeddingInput: CreateWeddingInput,
  ) {
    return (
      await this.weddingService.create(createWeddingInput)
    )._id.toString();
  }

  @Query(() => [Wedding], { name: 'findAllWeddings' })
  @UseGuards(JwtAuthGuard)
  findAllWeddings(
    @Args('skip', { type: () => Int }) skip: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.weddingService.findAll(skip, limit);
  }

  @Query(() => Wedding, { name: 'findWeddingById' })
  @UseGuards(JwtAuthGuard)
  findWeddingById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.weddingService.findById(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  removeWedding(
    @Args('id', { type: () => Int }) id: MongooseSchema.Types.ObjectId,
    @Context('req') req: any,
  ) {
    return this.weddingService.removeById(id);
  }
}
