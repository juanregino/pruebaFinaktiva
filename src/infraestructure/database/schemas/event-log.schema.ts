import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
//TODO : ELIMINAR EL CREATEDAT YA QUE LA PROPIEDAD TIMESTAMP ME LO CREA
@Schema({
  timestamps: true,
})
export class EventLog {

  @Prop(
    {
      required: false,
      unique: true,
      type: String,
    }
  )
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