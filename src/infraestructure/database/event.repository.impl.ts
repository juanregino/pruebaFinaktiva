import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EventLogDocument } from "./types";
import { EventLog } from "src/domain/entities/event-log.entity";
import { EventLogRepository } from "src/domain/interfaces/event-log.repository";


@Injectable()
export class EventLogRepositoryImpl  implements EventLogRepository {
  constructor(@InjectModel('EventLog') private eventLogModel: Model<EventLogDocument>) {}
  
  async save(eventLog: EventLog):Promise<void> {
    await this.eventLogModel.create({
      id: eventLog.id, 
      description: eventLog.description,
      type: eventLog.type,
      date: eventLog.Date,
    });
  }

  async findAll(filters?: { type?: string; since?: Date; until?: Date }): Promise<EventLog[]> {
    const query: any = {};

    if (filters?.type) {
      query.type = filters.type;
    }

    if (filters?.since || filters?.until) {
      query.fecha = {};
      if (filters.since) query.fecha.$gte = filters.since;
      if (filters.until) query.fecha.$lte = filters.until;
    }

    const results = await this.eventLogModel.find(query).exec();
    return results.map(
      (doc) => new EventLog(doc.id, doc.description, doc.type, doc.date),
    );
  }


}