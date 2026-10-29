// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// export type BidDocument = Bid & Document;

// export enum BidStatus {
//   PENDING = 'pending',
//   ACCEPTED = 'accepted',
//   REJECTED = 'rejected',
// }

// @Schema({ timestamps: true })
// export class Bid {
//   @Prop({ type: Types.ObjectId, ref: 'Pool', required: true })
//   poolId: Types.ObjectId;

//   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
//   dealerId: Types.ObjectId;

//   @Prop({ required: true })
//   offeredDiscount: string; 

//   @Prop({ type: String, enum: BidStatus, default: BidStatus.PENDING })
//   status: BidStatus;

//   @Prop()
//   notes: string;
// }

// export const BidSchema = SchemaFactory.createForClass(Bid);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt
export class Bid extends Document {
  @Prop({ required: true })
  poolId: string;

  @Prop({ required: true })
  dealerId: string;

  @Prop({ required: true })
  offerDetails: string;
}

export const BidSchema = SchemaFactory.createForClass(Bid);