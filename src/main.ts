import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  await app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
