import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Hantaran } from './hantaran.entity';
import { SelectedVendor } from './selected-vendor.entity';

@ObjectType()
@Schema()
export class Wedding {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => User, { nullable: true })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: false,
    unique: false,
    sparse: true,
  })
  groom: User | null;

  @Field(() => User, { nullable: true })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: false,
    unique: false,
    sparse: true,
  })
  bride: User | null;

  @Field(() => [User], { nullable: true })
  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: 'User', required: false },
    ],
  })
  member: User[] | null;

  @Field(() => String)
  @Prop({ required: false, default: '' })
  note: String;

  @Field(() => Int)
  @Prop({ default: 0 })
  budget: Number;

  @Field(() => [SelectedVendor], { nullable: true })
  @Prop({ type: [{ type: SelectedVendor, required: false }], default: [] })
  vendors: SelectedVendor[] | null;

  @Field(() => [Hantaran], { nullable: true })
  @Prop({ type: [{ type: Hantaran, required: false }], default: [] })
  hantaran: Hantaran[] | null;

  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, required: false })
  startDate: Date | null;

  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, required: false })
  endDate: Date | null;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // weddingOrganizer: Vendor;

  // @Field(() => Int)
  // @Prop({ required: false })
  // totalWeddingOrganizerPrice: Number;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // makeupArtist: Vendor;

  // @Field(() => Int)
  // @Prop({ required: false })
  // totalMakeupArtistPrice: Number;

  // @Field(() => SelectedVendor)
  // @Prop({ required: false })
  // riasHantaran: SelectedVendor;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // riasHantaran: Vendor;

  // @Field(() => Int)
  // @Prop({ required: false })
  // totalRiasHantaranPrice: Number;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // outfitVendor: Vendor;

  // @Field(() => Int)
  // @Prop({ required: false })
  // totalOutfitPrice: Number;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // ringVendor: Vendor;

  // @Field(() => Int)
  // @Prop({ required: false })
  // totalRingPrice: Number;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // masterOfCeremony: Vendor;

  // @Field(() => Int)
  // @Prop({ required: false })
  // totalMasterOfCeremonyPrice: Number;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // documentation: Vendor;

  // @Field(() => Int)
  // @Prop({ required: false })
  // totalDocumentationPrice: Number;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // catering: Vendor;

  // @Field(() => Int)
  // @Prop({ required: false })
  // totalCateringPrice: Number;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // venue: Vendor;

  // @Field(() => Int)
  // @Prop({ required: false })
  // totalVenuePrice: Number;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // nasyid: Vendor;

  // @Field(() => Int)
  // @Prop({ required: false })
  // totalNasyidPrice: Number;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // souvenir: Vendor;

  // @Field(() => Int)
  // @Prop({ required: false })
  // totalSouvenirPrice: Number;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // invitation: Vendor;

  // @Field(() => Int)
  // @Prop({ required: false })
  // totalInvitationPrice: Number;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // uniform: Vendor;

  // @Field(() => Int)
  // @Prop({ required: false })
  // totalUniformPrice: Number;
}

export const WeddingSchema = SchemaFactory.createForClass(Wedding).index(
  { groom: 1, bride: 1 },
  {
    unique: true,
    partialFilterExpression: { groom: { $ne: null }, bride: { $ne: null } },
  },
);

export type WeddingDocumentOverride = {
  vendors: Types.DocumentArray<SelectedVendor>;
  hantaran: Types.DocumentArray<Hantaran>;
};

export type WeddingDocument = HydratedDocument<
  Wedding,
  WeddingDocumentOverride
>;
