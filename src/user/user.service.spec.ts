import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { UserService } from './user.service';
import {
  closeMongodConnection,
  mongooseTestModule,
} from 'src/common/helpers/mongoose.helper';
import { Gender, User, UserSchema } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

const createUserInput: CreateUserInput = {
  name: 'Remuru',
  password: 'FakePassword1?',
  email: 'remuru.tempest@mail.com',
  gender: Gender.MAN,
};

const updateUserInput: UpdateUserInput = {
  _id: new MongooseSchema.Types.ObjectId(''),
  name: 'Remuru Tempest',
};

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        mongooseTestModule(),
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
      providers: [UserService, ConfigService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should create user', async () => {
    const user = await service.create(createUserInput);
    expect(user._id).toBeDefined();
    expect(user.name).toBe(createUserInput.name);
    expect(user.gender).toBe(createUserInput.gender);
    expect(user.email).toBe(createUserInput.email);
    expect(user.password).not.toBeNull();
    updateUserInput._id = user._id;
  });

  it('should find a user based on email', async () => {
    const user = await service.findByEmail(createUserInput.email);
    expect(user._id).toStrictEqual(updateUserInput._id);
  });

  it('should update some props of the user', async () => {
    const updatedUser = await service.updateById(
      updateUserInput._id,
      updateUserInput,
    );

    expect(updatedUser._id).toStrictEqual(updateUserInput._id);
    expect(updatedUser.name).not.toBe(createUserInput.name);

    expect(updatedUser.email).toBe(createUserInput.email);
  });

  it('it should remove the test user', async () => {
    const res = await service.removeById(updateUserInput._id);
    expect(res.deletedCount).toBe(1);
  });

  it('should get error not found for getting the removed user', async () => {
    try {
      await service.findById(updateUserInput._id);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.response).toBeDefined();
      expect(error.response.statusCode).toBe(404);
    }
  });

  it('should get error when attempting to update the removed user', async () => {
    try {
      await service.updateById(updateUserInput._id, updateUserInput);
    } catch (error) {
      expect(error).toBeDefined();
      console.log(error);
      // expect(error.response).toBeDefined();
      // expect(error.response.statusCode).toBe(404);
    }
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeMongodConnection();
    }
  });
});
