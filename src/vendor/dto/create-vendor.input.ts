import { InputType, Int, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateVendorInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: String;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description: String | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email: String | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(10)
  phoneNumber: String | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(10)
  address: String | null;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Length(5, 5)
  postCode: Number | null;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  kecamatan: String;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  kabupaten: String;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  province: String;

  @Field(() => String)
  @IsUrl()
  link: String;

  @Field(() => [VendorServiceInput])
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VendorServiceInput)
  services: VendorServiceInput[];
}

@InputType()
class VendorServiceInput {
  @Field(() => String)
  @IsString()
  @Length(24, 24)
  service: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3)
  priceRange: String | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3)
  description: String | null;
}
