// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { CreateBidDto } from './dto/create-bid.dto';
// import { Bid, BidDocument } from './entities/bid.entity';

// @Injectable()
// export class BidService {
//   constructor(@InjectModel(Bid.name) private bidModel: Model<BidDocument>) {}

//   async create(createBidDto: CreateBidDto): Promise<Bid> {
//     const createdBid = new this.bidModel(createBidDto);
//     return createdBid.save();
//   }

//   async findByPool(poolId: string): Promise<Bid[]> {
//     // Fetches all bids for a pool and populates the dealer's info
//     return this.bidModel
//       .find({ poolId })
//       .populate('dealerId', 'dealershipName city')
//       .exec();
//   }
// }


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bid } from './entities/bid.entity';

@Injectable()
export class BidService {
  constructor(@InjectModel(Bid.name) private bidModel: Model<Bid>) {}

  async createBid(poolId: string, dealerId: string, offerDetails: string): Promise<Bid> {
    const newBid = new this.bidModel({ poolId, dealerId, offerDetails });
    return newBid.save();
  }

  // Add this inside BidService
  async getBidsForPool(poolId: string): Promise<Bid[]> {
    return this.bidModel.find({ poolId }).exec();
  }
}