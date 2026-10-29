import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';

export type PoolDocument = Pool & Document;

@Schema({ timestamps: true })
export class Pool {
 
  // Add this property to your Pool class
@Prop({ type: [String], default: [] })
participants: string[];

  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  variant: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true, default: 0 })
  currentSize: number;

  @Prop({ required: true })
  targetSize: number;

  @Prop({ required: true })
  expectedDiscount: string;

  @Prop({ required: true })
  expiresAt: Date;

  // This establishes a relationship to the User collection
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  buyers: Types.ObjectId[];
}

export const PoolSchema = SchemaFactory.createForClass(Pool);