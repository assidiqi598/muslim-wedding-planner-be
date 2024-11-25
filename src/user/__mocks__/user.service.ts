import { userStub } from '../stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  findById: jest.fn().mockResolvedValue(userStub()),
  findAll: jest.fn().mockResolvedValue([userStub()]),
  create: jest.fn().mockResolvedValue(userStub()._id.toString()),
  updateById: jest.fn().mockResolvedValue(userStub()),
  removeById: jest
    .fn()
    .mockResolvedValue({ acknowledged: true, deletedCount: 1 }),
});
