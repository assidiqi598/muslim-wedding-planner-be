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
  @Prop({ unique: false, sparse: true, required: false })
  email: String | null;

  @Field(() => String, { nullable: true })
  @Prop({ required: false, unique: false, sparse: true })
  phoneNumber: String | null;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  address: String | null;

  @Field(() => Int, { nullable: true })
  @Prop({ required: false })
  postCode: Number | null;

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
  link: String | null;

  @Field(() => [VendorService])
  @Prop({
    type: [{ type: VendorService, required: true }],
    required: true,
    default: [],
  })
  services: VendorService[];

  @Field(() => Wedding, { nullable: true })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Wedding' }] })
  weddings: Wedding[] | null;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor).index(
  { email: 1, phoneNumber: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $ne: null },
      phoneNumber: { $ne: null },
    },
  },
);

export type VendorDocumentOverride = {
  services: Types.DocumentArray<VendorService>;
};

export type VendorDocument = HydratedDocument<Vendor, VendorDocumentOverride>;
