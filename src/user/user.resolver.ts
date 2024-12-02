import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { DeleteResult, Schema as MongooseSchema } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  // @Query(() => [User], { name: 'findAllUsers', nullable: true })
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Query(() => User, {
    name: 'findUserById',
    description: 'Get a user profile based on id',
    nullable: true,
  })
  @UseGuards(JwtAuthGuard)
  findById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<Boolean> {
    return (
      (await this.userService.updateById(updateUserInput._id, updateUserInput))
        ._id !== undefined
    );
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  removeUser(
    @Args('id', { type: () => String })
    id: MongooseSchema.Types.ObjectId,
  ): Promise<DeleteResult> {
    return this.userService.removeById(id);
  }
}
