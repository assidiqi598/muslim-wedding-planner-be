import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Gender } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: String;

  @Field(() => String)
  @IsEmail()
  email: String;

  @Field(() => String)
  @IsStrongPassword()
  password: String;

  @Field(() => String)
  @IsEnum(Gender)
  gender: String;
}
