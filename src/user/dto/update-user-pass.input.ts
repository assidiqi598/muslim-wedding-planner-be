import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsStrongPassword, Length, MinLength } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  @IsString()
  @Length(24, 24)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @IsStrongPassword()
  password: string;
}
