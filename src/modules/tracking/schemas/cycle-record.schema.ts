import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'cycle_records' })
export class CycleRecord extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: false })
  endDate: Date;

  @Prop({ required: true })
  cycleLength: number; // in days

  @Prop({ required: true })
  periodLength: number; // in days

  @Prop({ required: false })
  ovulationDate: Date;

  @Prop({ required: false })
  notes: string;
}

export const CycleRecordSchema = SchemaFactory.createForClass(CycleRecord);
