import { EventLog } from "src/domain/entities/event-log.entity";
import { EventLogRepository } from "src/domain/interfaces/event-log.repository";
import { FilterEventsDto } from "src/infraestructure/dto/filter-events.dto";


export class GetEventUseCase {

  constructor(private eventLogRepository: EventLogRepository) {}

  async execute(filterDto: FilterEventsDto):Promise<EventLog[]> {
    const filters = {
      type: filterDto.type ? filterDto.type.toUpperCase() : undefined,
      since: filterDto.since,
      until: filterDto.until,
    };

    return this.eventLogRepository.findAll(filters);
  }
}