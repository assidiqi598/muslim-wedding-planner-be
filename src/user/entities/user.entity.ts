import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Wedding } from 'src/wedding/entities/wedding.entity';

@ObjectType()
@Schema()
export class User {
  // We are using the @Field() decorator in addition to the @Prop() one to specify that the class propery is a GraphQL field
  // In other words, that decorator isn't necessary for Rest APIs

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Wedding)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Wedding',
    required: false,
  })
  wedding: Wedding;

  @Field(() => [Wedding])
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Wedding',
    required: false,
  })
  otherWeddings: Wedding[];

  @Field(() => String)
  @Prop({ required: true })
  name: String;

  @Field(() => String)
  @Prop({ unique: true, required: true })
  email: String;

  @Field(() => String)
  @Prop({ required: true })
  password: String;

  @Field(() => Boolean)
  @Prop({ default: false })
  isVerified: Boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
