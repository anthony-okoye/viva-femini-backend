import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SymptomFrequency extends Document {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, min: 0, max: 100 })
  percentage: number;

  @Prop({ default: Date.now })
  calculatedAt: Date;
}

export const SymptomFrequencySchema = SchemaFactory.createForClass(SymptomFrequency);
