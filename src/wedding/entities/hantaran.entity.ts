import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Hantaran {
  @Field(() => String)
  name: String;

  @Field(() => Number)
  price: Number;

  @Field(() => Boolean)
  purchased: Boolean;
}
