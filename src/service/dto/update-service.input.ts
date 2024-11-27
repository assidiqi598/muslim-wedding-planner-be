import { CreateServiceInput } from './create-service.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateServiceInput extends PartialType(CreateServiceInput) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
}
