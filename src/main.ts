import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  app.use(cookieParser());

  // enable CORS globally
  app.enableCors({
    origin: [`http://localhost:${port}`],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically strip any unwanted properties from incoming data
      forbidNonWhitelisted: true, // Throw an error if any non-declared property is found
      transform: true // Automatically transform payloads to match DTOs
    })
  )

  await app.listen(port);
}
bootstrap();
