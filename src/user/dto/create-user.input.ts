import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: String;

  @Field(() => String)
  email: String;

  @Field(() => String)
  password: String;

  // Array of Group Ids
  // @Field(() => [Group])
  // groups: Group[]
}
