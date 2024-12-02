import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsString, Length } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateWeddingMemberInput {
  @Field(() => String)
  @IsString()
  @Length(24, 24)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  @Length(24, 24, { each: true })
  member: MongooseSchema.Types.ObjectId[];
}
