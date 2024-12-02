import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Service } from 'src/service/entities/service.entity';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class VendorService {
  @Field(() => Service)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Service' })
  service: Service;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  priceRange: String | null;

  @Field(() => String)
  @Prop({ default: '' })
  description: String;
}

export const VendorServiceSchema = SchemaFactory.createForClass(VendorService);
