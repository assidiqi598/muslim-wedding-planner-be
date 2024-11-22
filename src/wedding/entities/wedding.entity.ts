import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { Hantaran } from './hantaran.entity';
import { SelectedVendor } from './selected-vendor.entity';

@ObjectType()
export class Wedding {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Field(() => [User])
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User', required: false })
  member: User[];

  @Field(() => String)
  @Prop({ required: false })
  note: String;

  @Field(() => Number)
  @Prop()
  budget: Number;

  @Field(() => SelectedVendor)
  @Prop({ required: false })
  weddingOrganizer: SelectedVendor;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // weddingOrganizer: Vendor;

  // @Field(() => Number)
  // @Prop({ required: false })
  // totalWeddingOrganizerPrice: Number;

  @Field(() => SelectedVendor)
  @Prop({ required: false })
  makeupArtist: SelectedVendor;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // makeupArtist: Vendor;

  // @Field(() => Number)
  // @Prop({ required: false })
  // totalMakeupArtistPrice: Number;

  @Field(() => [Hantaran])
  @Prop({ required: false })
  hantaran: Hantaran[];

  @Field(() => SelectedVendor)
  @Prop({ required: false })
  riasHantaran: SelectedVendor;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // riasHantaran: Vendor;

  // @Field(() => Number)
  // @Prop({ required: false })
  // totalRiasHantaranPrice: Number;

  @Field(() => SelectedVendor)
  @Prop({ required: false })
  weddingSuite: SelectedVendor;

  @Field(() => SelectedVendor)
  @Prop({ required: false })
  weddingDress: SelectedVendor;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // outfitVendor: Vendor;

  // @Field(() => Number)
  // @Prop({ required: false })
  // totalOutfitPrice: Number;

  @Field(() => SelectedVendor)
  @Prop({ required: false })
  groomRing: SelectedVendor;

  @Field(() => SelectedVendor)
  @Prop({ required: false })
  brideRing: SelectedVendor;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // ringVendor: Vendor;

  // @Field(() => Number)
  // @Prop({ required: false })
  // totalRingPrice: Number;

  @Field(() => SelectedVendor)
  @Prop({ required: false })
  masterOfCeremony: SelectedVendor;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // masterOfCeremony: Vendor;

  // @Field(() => Number)
  // @Prop({ required: false })
  // totalMasterOfCeremonyPrice: Number;

  @Field(() => SelectedVendor)
  @Prop({ required: false })
  documentation: SelectedVendor;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // documentation: Vendor;

  // @Field(() => Number)
  // @Prop({ required: false })
  // totalDocumentationPrice: Number;

  @Field(() => SelectedVendor)
  @Prop({ required: false })
  catering: SelectedVendor;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // catering: Vendor;

  // @Field(() => Number)
  // @Prop({ required: false })
  // totalCateringPrice: Number;

  @Field(() => SelectedVendor)
  @Prop({ required: false })
  venue: SelectedVendor;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // venue: Vendor;

  // @Field(() => Number)
  // @Prop({ required: false })
  // totalVenuePrice: Number;

  @Field(() => SelectedVendor)
  @Prop({ required: false })
  nasyid: SelectedVendor;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // nasyid: Vendor;

  // @Field(() => Number)
  // @Prop({ required: false })
  // totalNasyidPrice: Number;

  @Field(() => SelectedVendor)
  @Prop({ required: false })
  souvenir: SelectedVendor;

  // @Field(() => Vendor)
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  // souvenir: Vendor;

  // @Field(() => Number)
  // @Prop({ required: false })
  // totalSouvenirPrice: Number;

  @Field(() => Vendor)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  invitation: Vendor;

  @Field(() => Number)
  @Prop({ required: false })
  totalInvitationPrice: Number;

  @Field(() => Vendor)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor', required: false })
  uniform: Vendor;

  @Field(() => Number)
  @Prop({ required: false })
  totalUniformPrice: Number;

  @Field(() => Date)
  @Prop({ type: Date, required: false })
  startDate: Date;

  @Field(() => Date)
  @Prop({ type: Date, required: false })
  endDate: Date;
}

export type WeddingDocument = Wedding & Document;
export const WeddingSchema = SchemaFactory.createForClass(Wedding);
