import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Wedding } from 'src/wedding/entities/wedding.entity';
import { VendorService } from './vendor-service.entity';

@ObjectType()
@Schema()
export class Vendor {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  name: String;

  @Field(() => String)
  @Prop({ required: true, default: '' })
  description: String;

  @Field(() => String, { nullable: true })
  @Prop({ unique: true, required: false })
  email: String;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  phoneNumber: String;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  address: String;

  @Field(() => Int, { nullable: true })
  @Prop({ required: false })
  postCode: Number;

  @Field(() => String)
  @Prop({ required: true })
  kecamatan: String;

  @Field(() => String)
  @Prop({ required: true })
  kabupaten: String;

  @Field(() => String)
  @Prop({ required: true })
  province: String;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  link: String;

  @Field(() => [VendorService])
  @Prop({ type: [VendorService], required: true })
  services: VendorService[];

  @Field(() => Wedding, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Wedding' })
  weddings: Wedding[];
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);

export type VendorDocumentOverride = {
  services: Types.DocumentArray<VendorService>;
};

export type VendorDocument = HydratedDocument<Vendor, VendorDocumentOverride>;
