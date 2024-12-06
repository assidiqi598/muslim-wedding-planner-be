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
    return await this.authService.signUp(signUpInput, context.res);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: GraphQLContext,
  ): Promise<LoginResponse> {
    return await this.authService.login(loginInput, context.res);
  }

  @Mutation(() => LoginResponse)
  async refreshToken(
    @Context() context: GraphQLContext,
    @Args('csrfToken') csrfToken: string,
  ): Promise<LoginResponse> {
    const refreshToken = context.req.cookies['refreshToken'];
    const csrfTokenCookie = context.req.cookies['csrfToken'];

    if (!refreshToken || !csrfTokenCookie || !csrfToken) {
      throw new UnauthorizedException('One or more tokens missing');
    }

    return await this.authService.refreshToken(refreshToken, context.res);
  }
}
