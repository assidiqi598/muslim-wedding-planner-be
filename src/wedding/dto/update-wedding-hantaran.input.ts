import { Field, InputType, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateWeddingHantaranInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [HantaranInput])
  hantaran: HantaranInput[];
}

@InputType()
class HantaranInput {
  @Field(() => String)
  name: String;

  @Field(() => Int, { nullable: true })
  price: Number;

  @Field(() => Boolean, { nullable: true })
  isPurchased: Boolean;
}
