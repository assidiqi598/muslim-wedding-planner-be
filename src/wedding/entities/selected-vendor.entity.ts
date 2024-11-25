import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Service } from 'src/service/entities/service.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';

@ObjectType()
@Schema()
export class SelectedVendor {
  @Field(() => Vendor)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vendor' })
  vendor: Vendor;

  @Field(() => Service)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Service' })
  service: Service;

  @Field(() => Int)
  @Prop({ default: 0 })
  cost: Number;

  @Field(() => String)
  @Prop({ required: false, default: '' })
  note: String;
}

export const SelectedVendorSchema =
  SchemaFactory.createForClass(SelectedVendor);
