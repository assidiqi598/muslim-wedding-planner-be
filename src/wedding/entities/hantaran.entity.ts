import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Hantaran {
  @Field(() => String)
  @Prop({ required: true, default: '' })
  name: String;

  @Field(() => Int)
  @Prop({ required: true, default: 0 })
  price: Number;

  @Field(() => Boolean)
  @Prop({ required: true, default: false })
  isPurchased: Boolean;
}

export const HantaranSchema = SchemaFactory.createForClass(Hantaran);
