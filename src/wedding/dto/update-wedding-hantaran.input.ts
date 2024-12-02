import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsString,
  Length,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateWeddingHantaranInput {
  @Field(() => String)
  @IsString()
  @Length(24, 24)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [HantaranInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HantaranInput)
  hantaran: HantaranInput[];
}

@InputType()
class HantaranInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: String;

  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  @Min(0)
  price: Number;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  isPurchased: Boolean;
}
