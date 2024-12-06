import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/login-input.dto';
import { SignUpInput } from './dto/sign-up.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

interface Tokens {
  accessToken: string;
  refreshToken: string;
  csrfToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async login(
    loginInput: LoginInput,
    res: Response,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(loginInput.email);
    if (
      user &&
      (await bcrypt.compare(loginInput.password, user.password.toString()))
    ) {
      return this.generateTokens(user.email, user._id.toString(), res);
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async signUp(
    signUpInput: SignUpInput,
    res: Response,
  ): Promise<{ accessToken: string }> {
    const { password, ...input } = signUpInput;

    const hashed = await bcrypt.hash(
      password,
      Number(this.configService.get<number>('SALT_ROUNDS')),
    );

    const newUser = await this.userService.create({
      ...input,
      password: hashed,
    });

    return this.generateTokens(newUser.email, newUser._id.toString(), res);
  }

  async refreshToken(
    refreshToken: string,
    res: Response,
  ): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);

      const user = await this.userService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.generateTokens(user.email, user._id.toString(), res);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  generateTokens(
    email: string,
    id: string,
    res: Response,
  ): { accessToken: string } {
    const payload = { email: email, sub: id };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '3d',
    });
    const csrfToken = this.jwtService.sign({}, { expiresIn: '3d' });

    // Set refresh token (HTTP-only)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    // Set CSRF token (accessible by client)
    res.cookie('csrfToken', csrfToken, {
      httpOnly: false, // Client can read this cookie
      secure: true,
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3days
    });

    return { accessToken };
  }
}
