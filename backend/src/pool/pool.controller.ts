import { Body,Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import { PoolService } from './pool.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard'; // 1. Import RolesGuard
import { Roles } from '../auth/roles.decorator';  // 2. Import Roles decorator
@Controller('pool')
export class PoolController {
  constructor(private readonly poolService: PoolService) {}


  @Get()
  async findAll() {
    return this.poolService.findAll();
  }
  // ... your existing @Get routes ...
 @Post()
  async createPool(@Body() poolData: any) {
    return this.poolService.createPool(poolData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.poolService.findOne(id);
  }
  
@UseGuards(AuthGuard, RolesGuard) // 3. Chain both guards
  @Roles('buyer')                   // 4. Lock this route to Buyers
  @Post(':id/join')
  async joinPool(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.sub || req.user.id || req.user._id; 
    return this.poolService.joinPool(id, userId);
  }
}