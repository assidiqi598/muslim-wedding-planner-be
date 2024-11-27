import { InputType, Int, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateVendorInput {
  @Field(() => String)
  name: String;

  @Field(() => String, { nullable: true })
  description: String;

  @Field(() => String, { nullable: true })
  email: String;

  @Field(() => String, { nullable: true })
  phoneNumber: String;

  @Field(() => String, { nullable: true })
  address: String;

  @Field(() => Int, { nullable: true })
  postCode: Number;

  @Field(() => String)
  kecamatan: String;

  @Field(() => String)
  kabupaten: String;

  @Field(() => String)
  province: String;

  @Field(() => String, { nullable: true })
  link: String;

  @Field(() => [VendorServiceInput])
  services: VendorServiceInput[];
}

@InputType()
class VendorServiceInput {
  @Field(() => String)
  service: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  priceRange: String;

  @Field(() => String, { nullable: true })
  description: String;
}
