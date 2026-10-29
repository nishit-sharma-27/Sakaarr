// import { Controller, Get, Post, Body, Param } from '@nestjs/common';
// import { BidService } from './bid.service';
// import { CreateBidDto } from './dto/create-bid.dto';

// @Controller('bid')
// export class BidController {
//   constructor(private readonly bidService: BidService) {}

//   @Post()
//   create(@Body() createBidDto: CreateBidDto) {
//     return this.bidService.create(createBidDto);
//   }

//   @Get('pool/:poolId')
//   findByPool(@Param('poolId') poolId: string) {
//     return this.bidService.findByPool(poolId);
//   }
// }


import { Controller, Post, Body, UseGuards,Param, Req ,Get} from '@nestjs/common';
import { BidService } from './bid.service';
import { AuthGuard } from '../auth/auth.guard'; // Adjust path if necessary
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('dealer') // Lock this to Dealers only
  @Post()
  async submitBid(@Body() bidData: any, @Req() req: any) {
    const dealerId = req.user.sub || req.user.id || req.user._id;
    return this.bidService.createBid(bidData.poolId, dealerId, bidData.offerDetails);
  }

  @UseGuards(AuthGuard)
    @Get('pool/:poolId')
    async getPoolBids(@Param('poolId') poolId: string) {
      return this.bidService.getBidsForPool(poolId);
    }
}