import { CreateWeddingInput } from './create-wedding.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateWeddingInput extends PartialType(CreateWeddingInput) {
  @Field(() => String)
  @IsString()
  @Length(24, 24)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3)
  note: String | null;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  budget: Number | null;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : null))
  startDate: Date | null;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : null))
  endDate: Date | null;
}
