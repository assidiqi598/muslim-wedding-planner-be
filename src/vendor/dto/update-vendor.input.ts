import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateVendorInput } from './create-vendor.input';

@InputType()
export class UpdateVendorInput extends PartialType(CreateVendorInput) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [String], { nullable: true })
  weddings: MongooseSchema.Types.ObjectId[];
}
