import { ObjectType, Field } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export enum Services {
  WEDDING_ORGANIZER = 'Wedding Organizer (WO)',
  MAKEUP_ARTIST = 'Makeup Artist (MUA)',
  RIAS_HANTARAN = 'Rias Hantaran/Seserahan',
  RIAS_MAHAR = 'Rias Mahar',
  WEDDING_SUITE = 'Jas/Suite/Pakaian Mempelai Laki-Laki',
  WEDDING_DRESS = 'Gaun Pengantin/Dress',
  WEDDING_RING_GROOM = 'Cincin Mempelai Laki-Laki',
  WEDDING_RING_BRIDE = 'Cincin Mempelai Perempuan',
  MASTER_OF_CEREMONY = 'Master of Ceremony (MC)',
  DOCUMENTATION = 'Dokumentasi/Photographer/Videographer',
  CATERING = 'Catering',
  SOUVENIR = 'Souvenir',
  INVITATION = 'Undangan',
  DIGITAL_INVITATION = 'Undangan Digital',
  UNIFORM = 'Seragam',
  WEDDING_TENT = '',
}
@ObjectType()
export class Service {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ type: String, enum: Services, required: true })
  name: String;

  @Field(() => String)
  @Prop({ required: false })
  priceRange: String;

  @Field(() => String)
  @Prop({ required: false })
  description: String;
}
