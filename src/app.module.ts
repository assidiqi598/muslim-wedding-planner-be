import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import helmet from 'helmet';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { WeddingModule } from './wedding/wedding.module';
import { VendorModule } from './vendor/vendor.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options: MongooseModuleOptions = {
          uri: configService.get<string>('DATABASE_URL'),
        };

        return options;
      },
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    UserModule,
    WeddingModule,
    VendorModule,
    ServiceModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes('*'); // Apply Helmet globally
    consumer
      .apply(
        helmet.contentSecurityPolicy({
          directives: {
            defaultSrc: ["'self'"], // Allow only self-hosted resources
            scriptSrc: ["'self'"], // Only allow scripts from the same origin
            styleSrc: ["'self'", "'unsafe-inline'"], // Allow styles from the same origin, including inline styles
            objectSrc: ["'none'"], // Prevent embedding objects (Flash, etc.)
            imgSrc: ["'self'", 'data:'], // Allow images from the same origin and data URIs
            connectSrc: ["'self'"], // Allow GraphQL requests to the same origin
            fontSrc: ["'self'"], // Allow fonts from the same origin
            upgradeInsecureRequests: [], // Automatically upgrade HTTP to HTTPS
          },
        }),
      )
      .forRoutes('*'); // Apply to all routes
  }
}
