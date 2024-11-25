import { Field, InputType, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateWeddingVendorInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [VendorInput])
  vendors: VendorInput[];
}

@InputType()
class VendorInput {
  @Field(() => String)
  vendor: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  service: MongooseSchema.Types.ObjectId;

  @Field(() => Int, { nullable: true })
  cost: Number;

  @Field(() => String, { nullable: true })
  note: String;
}
