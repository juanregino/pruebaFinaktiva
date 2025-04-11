import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
export class EventLog {
  @Prop({
    required: false,
    unique: true,
    type: String,
  })
  id: string;
  @Prop({
    type: String,
  })
  description: string;
  @Prop({
    type: String,
  })
  type: string;
  @Prop({
    type: Date,
    default: Date.now,
  })
  date: Date;
}
export const EventLogSchema = SchemaFactory.createForClass(EventLog);
