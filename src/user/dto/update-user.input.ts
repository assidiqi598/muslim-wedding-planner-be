import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  wedding?: MongooseSchema.Types.ObjectId;

  @Field(() => [String], { nullable: true })
  otherWedings?: MongooseSchema.Types.ObjectId[];
}
