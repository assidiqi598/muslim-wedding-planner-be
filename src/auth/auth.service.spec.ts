import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {
  closeMongodConnection,
  mongooseTestModule,
} from 'src/common/helpers/mongoose.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { Gender, User, UserSchema } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignUpInput } from './dto/sign-up.dto';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';

const signUpInput: SignUpInput = {
  name: 'Remuru',
  email: 'remuru.tempest@mail.com',
  password: 'FakePassword3?',
  gender: Gender.MAN,
};

describe('AuthService', () => {
  let service: AuthService, module: TestingModule, refreshToken: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtStrategy,
        JwtAuthGuard,
        {
          provide: ConfigService,
          useFactory: () => ({
            get: jest.fn((key: string) => {
              if (key === 'SALT_ROUNDS') {
                return 9;
              }
              if (key === 'JWT_SECRET') {
                return 'some_super_secret_key';
              }
              return null;
            }),
          }),
        },
      ],
      imports: [
        mongooseTestModule(),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
          }),
          inject: [ConfigService],
        }),
        ConfigModule.forRoot(),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should sign a user up', async () => {
    const data = await service.signUp(signUpInput);

    expect(data.refreshToken).toBeDefined();
    expect(data.accessToken).toBeDefined();
  });

  it('should log a user in', async () => {
    const data = await service.login({
      email: signUpInput.email,
      password: signUpInput.password,
    });

    expect(data.refreshToken).toBeDefined();
    expect(data.accessToken).toBeDefined();

    refreshToken = data.refreshToken;
  });

  it('should get refresh token', async () => {
    const data = await service.refreshToken(refreshToken);

    expect(data.refreshToken).toBeDefined();
    expect(data.accessToken).toBeDefined();
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeMongodConnection();
    }
  });
});
