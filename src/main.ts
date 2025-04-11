import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,
    allowedHeaders: 'Content-Type,Authorization,X-Requested-With',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app.useGlobalFilters(new AllExceptionsFilter());
}
bootstrap();
