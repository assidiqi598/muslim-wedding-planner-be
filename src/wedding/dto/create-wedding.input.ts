import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateWeddingInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(24, 24)
  groom: MongooseSchema.Types.ObjectId | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(24, 24)
  bride: MongooseSchema.Types.ObjectId | null;
}
