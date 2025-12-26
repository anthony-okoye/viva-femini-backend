import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class DailyCheckoff extends Document {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  symptoms: string;

  @Prop({ required: true })
  healthReport: string;

  @Prop({ required: true })
  trendSymptom: string;

  @Prop({ required: true })
  trendIntensity: string;
}

export const DailyCheckoffSchema = SchemaFactory.createForClass(DailyCheckoff);
