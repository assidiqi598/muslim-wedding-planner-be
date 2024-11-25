import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: String;

  @Field(() => String)
  email: String;

  @Field(() => String)
  password: String;

  @Field(() => String)
  gender: String;
}
