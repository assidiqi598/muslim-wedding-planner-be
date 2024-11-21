import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Vendor {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
