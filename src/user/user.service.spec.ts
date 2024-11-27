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
import { WeddingService } from 'src/wedding/wedding.service';
import { WeddingModule } from 'src/wedding/wedding.module';
import { Wedding, WeddingSchema } from 'src/wedding/entities/wedding.entity';
import { createWeddingInput } from 'src/wedding/stubs/wedding.stub';
import { createUserInput } from './stubs/user.stub';

const updateUserInput: UpdateUserInput = {
  _id: new MongooseSchema.Types.ObjectId(''),
  name: 'Remuru Tempest',
  wedding: new MongooseSchema.Types.ObjectId(''),
  otherWeddings: [],
};

describe('UserService', () => {
  let userService: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [UserService, WeddingService],
      imports: [
        mongooseTestModule(),
        WeddingModule,
        MongooseModule.forFeature([
          {
            name: Wedding.name,
            schema: WeddingSchema,
          },
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    const weddingService: WeddingService =
      module.get<WeddingService>(WeddingService);

    const wedding1 = await weddingService.create(createWeddingInput);
    const wedding2 = await weddingService.create(createWeddingInput);
    const wedding3 = await weddingService.create(createWeddingInput);

    updateUserInput.wedding = wedding1._id;

    updateUserInput.otherWeddings.push(wedding2._id);
    updateUserInput.otherWeddings.push(wedding3._id);
  });

  it('should create user', async () => {
    const user = await userService.create(createUserInput);
    expect(user._id).toBeDefined();
    expect(user.name).toBe(createUserInput.name);
    expect(user.gender).toBe(createUserInput.gender);
    expect(user.email).toBe(createUserInput.email);
    expect(user.password).not.toBeNull();
    updateUserInput._id = user._id;
  });

  it('should find a user based on email', async () => {
    const user = await userService.findByEmail(createUserInput.email);
    expect(user._id).toStrictEqual(updateUserInput._id);
  });

  it('should update some props of the user', async () => {
    const updatedUser = await userService.updateById(
      updateUserInput._id,
      updateUserInput,
    );

    expect(updatedUser._id).toStrictEqual(updateUserInput._id);
    expect(updatedUser.name).not.toBe(createUserInput.name);
    expect(updatedUser.wedding).toStrictEqual(updatedUser.wedding);
    expect(updatedUser.otherWeddings).toHaveLength(2);

    // Prop which is not updated should remain
    expect(updatedUser.email).toBe(createUserInput.email);
  });

  it('it should remove the test user', async () => {
    const res = await userService.removeById(updateUserInput._id);
    expect(res.deletedCount).toBe(1);
  });

  it('should get error not found for getting the removed user', async () => {
    try {
      await userService.findById(updateUserInput._id);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.response).toBeDefined();
      expect(error.response.statusCode).toBe(404);
    }
  });

  it('should get error when attempting to update the removed user', async () => {
    try {
      await userService.updateById(updateUserInput._id, updateUserInput);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.response).toBeDefined();
      expect(error.response.statusCode).toBe(404);
    }
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeMongodConnection();
    }
  });
});
