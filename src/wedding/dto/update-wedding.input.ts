import { CreateWeddingInput } from './create-wedding.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateWeddingInput extends PartialType(CreateWeddingInput) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  note: String;

  @Field(() => Int, { nullable: true })
  budget: Number;

  @Field(() => Date, { nullable: true })
  startDate: Date;

  @Field(() => Date, { nullable: true })
  endDate: Date;
}
