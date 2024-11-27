import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Wedding } from 'src/wedding/entities/wedding.entity';

export enum Gender {
  MAN = 'Pria',
  WOMAN = 'Wanita',
}

registerEnumType(Gender, {
  name: 'Gender',
});

@ObjectType()
@Schema()
export class User {
  // We are using the @Field() decorator in addition to the @Prop() one to specify that the class propery is a GraphQL field
  // In other words, that decorator isn't necessary for Rest APIs

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Wedding, { nullable: true })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Wedding',
    required: false,
  })
  wedding: Wedding;

  @Field(() => [Wedding], { nullable: true })
  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: 'Wedding', required: false },
    ],
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

  @Field(() => Gender)
  @Prop({ type: String, enum: Gender, required: true })
  gender: Gender;

  @Field(() => Boolean)
  @Prop({ default: false })
  isVerified: Boolean;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
