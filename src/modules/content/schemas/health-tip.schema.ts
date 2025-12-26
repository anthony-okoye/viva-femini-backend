import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'health_tips' })
export class HealthTip extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: false })
  category: string;

  @Prop({ type: [String], default: [] })
  conditions: string[];

  @Prop({ default: 0 })
  priority: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const HealthTipSchema = SchemaFactory.createForClass(HealthTip);
