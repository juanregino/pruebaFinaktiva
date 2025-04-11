export interface EventLogDocument extends Document {
  id: string;
  description: string;
  type: string;
  date: Date;
}
