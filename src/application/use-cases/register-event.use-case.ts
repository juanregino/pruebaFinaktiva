import { BadRequestException } from '@nestjs/common';
import { EventLog } from 'src/domain/entities/event-log.entity';
import { EventLogRepository } from 'src/domain/interfaces/event-log.repository';
import { CreateEventDto } from 'src/infraestructure/dto/create-event.dto';

export class RegisterEventUseCase {
  constructor(private readonly eventLogRepository: EventLogRepository) {}

  async execute(input: CreateEventDto) {
    const description = input.description?.trim();
    if (!description) {
      throw new BadRequestException('La descripción no puede estar vacía');
    }

    const validTypes = {
      api: 'API',
      manual: 'MANUAL',
    };

    const normalizedType = validTypes[input.type.toLowerCase()];
    if (!normalizedType) {
      throw new BadRequestException(
        'Tipo de evento inválido. Debe ser API o Manual',
      );
    }

    const eventLog = new EventLog(
      Date.now().toString(),
      description,
      normalizedType as 'API' | 'MANUAL',
      input.date,
    );

    await this.eventLogRepository.save(eventLog);
  }
}
