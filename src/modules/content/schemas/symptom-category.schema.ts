import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Symptom {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  emoji: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: false })
  description: string;
}

@Schema({ timestamps: true, collection: 'symptom_categories' })
export class SymptomCategory extends Document {
  @Prop({ required: true, unique: true })
  category: string;

  @Prop({ type: [Symptom], default: [] })
  symptoms: Symptom[];

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const SymptomCategorySchema = SchemaFactory.createForClass(SymptomCategory);
