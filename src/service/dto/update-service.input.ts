import { CreateServiceInput } from './create-service.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateServiceInput extends PartialType(CreateServiceInput) {
  @Field(() => String)
  @IsString()
  @Length(24, 24)
  _id: MongooseSchema.Types.ObjectId;
}
