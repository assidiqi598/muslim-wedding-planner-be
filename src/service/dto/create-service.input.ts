import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {
  @Field(() => String, {
    description:
      'Value should be capital and space should use underscore, example: "RIAS_HANTARAN"',
  })
  name: String;

  @Field(() => String, {
    description: 'Name of the service which is displayed in frontend',
  })
  displayName: String;
}
