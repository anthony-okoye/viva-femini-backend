// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true, collection: 'users' })
export class User extends Document {
  @Prop({ 
    type: String, 
    unique: true, 
    index: true, 
    default: () => `VF-${uuidv4().split('-')[0].toUpperCase()}` 
  })
  reference: string;

  @Prop({ required: true, unique: true, index: true })
  firebase_uid: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, lowercase: true, trim: true })
  firstname: string;

  @Prop({ required: true, lowercase: true, trim: true })
  lastname: string;

  @Prop({ required: false })
  password?: string;

  @Prop({ default: null })
  profile_url: string;

  @Prop({ default: 28 })
  avgCycleLength: number;

  @Prop({ default: 5 })
  avgPeriodLength: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
