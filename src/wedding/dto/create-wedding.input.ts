import { InputType, Int, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateWeddingInput {
  @Field(() => String, { nullable: true })
  groom: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  bride: MongooseSchema.Types.ObjectId;
}
