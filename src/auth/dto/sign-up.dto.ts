import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/user/entities/user.entity';

@InputType()
export class SignUpInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsStrongPassword()
  password: string;

  @Field(() => String)
  @IsEnum(Gender)
  gender: string;
}
