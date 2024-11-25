import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => String)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return (await this.userService.create(createUserInput))._id.toString();
  }

  // @Query(() => [User], { name: 'findAllUsers', nullable: true })
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Query(() => User, {
    name: 'findUserById',
    description: 'Get a user profile based on id',
    nullable: true,
  })
  findById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.findById(id);
  }

  @Mutation(() => Boolean)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return (
      (await this.userService.updateById(updateUserInput._id, updateUserInput))
        ._id !== undefined
    );
  }

  @Mutation(() => User)
  removeUser(
    @Args('id', { type: () => String })
    id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.removeById(id);
  }
}
