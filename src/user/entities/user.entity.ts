import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class User {
  // We are using the @Field() decorator in addition to the @Prop() one to specify that the class propery is a GraphQL field
  // In other words, that decorator isn't necessary for Rest APIs

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  // Array of Group Ids
  // @Field(() => [Group])
  // @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Group'})
  // groups: Group[]

  @Field(() => String)
  @Prop()
  name: String;

  @Field(() => String)
  @Prop({ unique: true })
  email: String;

  @Field(() => String)
  @Prop()
  password: String;

  @Field(() => Boolean)
  @Prop()
  isVerified: Boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
