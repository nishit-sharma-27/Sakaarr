import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  BUYER = 'buyer',
  DEALER = 'dealer',
}

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.BUYER })
  role: UserRole;

  @Prop()
  city: string; 

  @Prop()
  dealershipName: string; // Only applies if role is 'dealer'
}

export const UserSchema = SchemaFactory.createForClass(User);