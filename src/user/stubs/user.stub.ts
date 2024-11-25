import { User } from '../entities/user.entity';
import { Schema as MongooseSchema } from 'mongoose';
import { Gender } from '../entities/user.entity';

export const userStub = (): User => ({
  _id: new MongooseSchema.Types.ObjectId('1234567890abcdefghijklm'),
  name: 'user test',
  email: 'user_test@test.com',
  password: 'passTest1234',
  gender: Gender.WOMAN,
  isVerified: false,
});
