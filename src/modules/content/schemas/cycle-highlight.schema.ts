import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CycleHighlight extends Document {
  @Prop({ required: true })
  icon: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  action: string;

  @Prop({ required: true, enum: ['blush', 'peach', 'mint'] })
  colorClass: string;

  @Prop({ required: true })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const CycleHighlightSchema = SchemaFactory.createForClass(CycleHighlight);
