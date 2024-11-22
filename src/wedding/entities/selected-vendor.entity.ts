import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Vendor } from 'src/vendor/entities/vendor.entity';

@ObjectType()
export class SelectedVendor {
  @Field(() => Vendor)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor' })
  vendor: Vendor;

  @Field(() => Number)
  @Prop()
  cost: Number;

  @Field(() => String)
  @Prop({ required: false })
  note: String;
}
