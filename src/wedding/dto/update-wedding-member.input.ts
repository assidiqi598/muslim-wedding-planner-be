import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateWeddingMemberInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [String])
  member: MongooseSchema.Types.ObjectId[];
}
