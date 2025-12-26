import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'quick_actions' })
export class QuickAction extends Document {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true })
  route: string;

  @Prop({ required: false })
  color: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const QuickActionSchema = SchemaFactory.createForClass(QuickAction);
