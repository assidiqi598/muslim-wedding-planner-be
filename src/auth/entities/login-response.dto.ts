import { ObjectType, Field } from '@nestjs/graphql';
import { Gender } from 'src/user/entities/user.entity';
import { Wedding } from 'src/wedding/entities/wedding.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => Gender)
  gender: Gender;

  @Field(() => Wedding, { nullable: true })
  wedding: Wedding | null;

  @Field(() => [Wedding], { nullable: true })
  otherWeddings: Wedding[] | null;

  @Field(() => String)
  name: String;

  @Field(() => String)
  email: String;

  @Field(() => Boolean)
  isVerified?: Boolean;
}
