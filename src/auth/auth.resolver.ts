import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input.dto';
import { LoginResponse } from './entities/login-response.dto';
import { SignUpInput } from './dto/sign-up.dto';
import { UnauthorizedException } from '@nestjs/common';
import { GraphQLContext } from 'src/common/types/graphql-context.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async signUp(
    @Args('createUserInput') signUpInput: SignUpInput,
    @Context() context: GraphQLContext,
  ): Promise<LoginResponse> {
    const { refreshToken, ...data } =
      await this.authService.signUp(signUpInput);

    context.res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return data;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: GraphQLContext,
  ): Promise<LoginResponse> {
    const { refreshToken, ...data } = await this.authService.login(loginInput);

    context.res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return data;
  }

  @Mutation(() => LoginResponse)
  async refreshToken(
    @Context() context: GraphQLContext,
  ): Promise<LoginResponse> {
    const refreshToken = context.req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const { refreshToken: newRefreshToken, ...data } =
      await this.authService.refreshToken(refreshToken);

    context.res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return data;
  }
}
