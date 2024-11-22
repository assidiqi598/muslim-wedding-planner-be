import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@ObjectType()
export class Hantaran {
  @Field(() => String)
  @Prop({ required: true })
  name: String;

  @Field(() => Number)
  @Prop({ required: true })
  price: Number;

  @Field(() => Boolean)
  @Prop({ required: true, default: false })
  isPurchased: Boolean;
}
