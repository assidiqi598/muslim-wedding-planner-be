import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Service } from 'src/service/entities/service.entity';
import { Wedding } from 'src/wedding/entities/wedding.entity';

@ObjectType()
export class Vendor {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  name: String;

  @Field(() => String)
  @Prop({ required: true })
  description: String;

  @Field(() => String)
  @Prop({ unique: true, required: false })
  email: String;

  @Field(() => String)
  @Prop({ required: false })
  phoneNumber: String;

  @Field(() => String)
  @Prop({ required: false })
  address: String;

  @Field(() => Number)
  @Prop({ required: false })
  postCode: Number;

  @Field(() => String)
  @Prop({ required: false })
  kecamatan: String;

  @Field(() => String)
  @Prop({ required: false })
  kabupaten: String;

  @Field(() => String)
  @Prop({ required: false })
  province: String;

  @Field(() => String)
  @Prop({ required: false })
  link: String;

  @Field(() => [Service])
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Service' })
  services: Service[];

  @Field(() => Wedding)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Wedding' })
  weddings: Wedding[];
}
