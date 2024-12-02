import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/login-input.dto';
import { LoginResponse } from './entities/login-response.dto';
import { SignUpInput } from './dto/sign-up.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async login(
    loginInput: LoginInput,
  ): Promise<LoginResponse & { refreshToken: string }> {
    const user = await this.userService.findByEmail(loginInput.email);
    if (
      user &&
      (await bcrypt.compare(loginInput.password, user.password.toString()))
    ) {
      const tokens = this.generateTokens(user.email, user._id.toString());
      const { password, _id, ...userData } = user;

      return {
        ...tokens,
        ...userData,
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async signUp(
    signUpInput: SignUpInput,
  ): Promise<LoginResponse & { refreshToken: string }> {
    const { password, ...input } = signUpInput;

    const hashed = await bcrypt.hash(
      password,
      Number(this.configService.get<number>('SALT_ROUNDS')),
    );

    const newUser = await this.userService.create({
      ...input,
      password: hashed,
    });

    const tokens = this.generateTokens(newUser.email, newUser._id.toString());
    const { password: newUserPass, _id, ...userData } = newUser;

    return {
      ...tokens,
      ...userData,
    };
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<LoginResponse & { refreshToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);

      const user = await this.userService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const tokens = this.generateTokens(user.email, user._id.toString());
      const { password, _id, ...userData } = user;

      return {
        ...tokens,
        ...userData,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  generateTokens(
    email: string,
    id: string,
  ): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload = { email: email, sub: id };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '3d' });

    return { accessToken, refreshToken };
  }
}
