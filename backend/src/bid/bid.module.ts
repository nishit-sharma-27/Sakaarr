import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { Bid, BidSchema } from './entities/bid.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bid.name, schema: BidSchema }])
  ],
  controllers: [BidController],
  providers: [BidService],
})
export class BidModule {}