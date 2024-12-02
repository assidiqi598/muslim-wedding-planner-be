import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, Length } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  @IsString()
  @Length(24, 24)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(24, 24)
  wedding: MongooseSchema.Types.ObjectId | null;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(24, 24, { each: true })
  otherWeddings: MongooseSchema.Types.ObjectId[] | null;
}
