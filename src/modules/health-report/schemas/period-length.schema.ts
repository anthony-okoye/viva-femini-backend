import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'period_length' })
export class PeriodLength extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, min: 0, max: 10 })
  flowValue: number;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  sequenceOrder: number;
}

export const PeriodLengthSchema = SchemaFactory.createForClass(PeriodLength);

// Create index for efficient querying
PeriodLengthSchema.index({ timestamp: 1 });
