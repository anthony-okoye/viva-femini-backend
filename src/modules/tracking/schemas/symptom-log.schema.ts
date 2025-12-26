import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class SymptomEntry {
  @Prop({ required: true })
  category: string; // "Physical Pain", "Mood & Mental", etc.

  @Prop({ type: [String], default: [] })
  symptoms: string[]; // Array of symptom IDs
}

@Schema({ timestamps: true, collection: 'symptom_logs' })
export class SymptomLog extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true, index: true })
  date: Date;

  @Prop({ type: [SymptomEntry], default: [] })
  symptoms: SymptomEntry[];

  @Prop({ min: 1, max: 5, default: 3 })
  flowIntensity: number;

  @Prop({ required: false })
  notes: string;
}

export const SymptomLogSchema = SchemaFactory.createForClass(SymptomLog);

// Create compound index for user + date
SymptomLogSchema.index({ userId: 1, date: 1 }, { unique: true });
