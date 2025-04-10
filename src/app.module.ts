import { Module } from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose';
import { EventLogSchema } from './infraestructure/database/schemas/event-log.schema';
import { EventLogController } from './infraestructure/controllers/event-log.controller';
import { EventLogRepositoryImpl } from './infraestructure/database/event.repository.impl';
import { RegisterEventUseCase } from './application/use-cases/register-event.use-case';
import { GetEventUseCase } from './application/use-cases/get-event.use-case';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URI_MONGO),
    MongooseModule.forFeature([{ name: 'EventLog', schema: EventLogSchema }]),
  ],
  controllers: [EventLogController],
  providers: [
    EventLogRepositoryImpl,
    {
      provide: 'RegisterEventUseCase',
      useFactory: (repo: EventLogRepositoryImpl) =>
        new RegisterEventUseCase(repo),
      inject: [EventLogRepositoryImpl],
    },
    {
      provide: 'GetEventUseCase',
      useFactory: (repo: EventLogRepositoryImpl) => new GetEventUseCase(repo),
      inject: [EventLogRepositoryImpl],
    },
  ],
})
export class AppModule {}
