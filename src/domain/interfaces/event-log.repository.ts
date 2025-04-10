import { EventLog } from "../entities/event-log.entity";

export interface EventLogRepository {
  save(eventLog: EventLog): Promise<void>;
  findAll(filters?: { type?: string; since?: Date; until?: Date }): Promise<EventLog[]>; 
}