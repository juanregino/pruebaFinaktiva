import { EventLog } from "src/domain/entities/event-log.entity";
import { EventLogRepository } from "src/domain/interfaces/event-log.repository";


interface RegisterEventInput {
  description: string;
  type: string;
  date: Date;
}


export class RegisterEventUseCase {
  constructor(private eventLogRepository: EventLogRepository) {}

  async execute(input: RegisterEventInput) {
    const eventLog = new EventLog(
      Date.now().toString(),
      input.description,
      input.type,
      new Date(),
      
    );

    return this.eventLogRepository.save(eventLog);
  }
}