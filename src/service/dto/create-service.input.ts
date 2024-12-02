import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateServiceInput {
  @Field(() => String, {
    description:
      'Value should be capital and space should use underscore, example: "RIAS_HANTARAN"',
  })
  @IsString()
  @MinLength(3)
  name: String;

  @Field(() => String, {
    description: 'Name of the service which is displayed in frontend',
  })
  @IsString()
  @MinLength(3)
  displayName: String;
}
