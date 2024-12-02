import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateWeddingVendorInput {
  @Field(() => String)
  @IsString()
  @Length(24, 24)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [VendorInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VendorInput)
  vendors: VendorInput[];
}

@InputType()
class VendorInput {
  @Field(() => String)
  @IsString()
  @Length(24, 24)
  vendor: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @IsString()
  @Length(24, 24)
  service: MongooseSchema.Types.ObjectId;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  cost: Number | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3)
  note: String | null;
}
