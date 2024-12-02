import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateVendorInput } from './create-vendor.input';
import { IsArray, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class UpdateVendorInput extends PartialType(CreateVendorInput) {
  @Field(() => String)
  @IsString()
  @Length(24, 24)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(24, 24, { each: true })
  weddings: MongooseSchema.Types.ObjectId[] | null;
}
