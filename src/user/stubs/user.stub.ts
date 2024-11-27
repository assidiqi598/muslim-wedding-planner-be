import { CreateUserInput } from '../dto/create-user.input';
import { Gender } from '../entities/user.entity';

export const createUserInput: CreateUserInput = {
  name: 'Remuru',
  password: 'FakePassword1?',
  email: 'remuru.tempest@mail.com',
  gender: Gender.MAN,
};
