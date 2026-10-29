import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pool } from './entities/pool.entity';
@Injectable()
export class PoolService {
  constructor(@InjectModel(Pool.name) private poolModel: Model<Pool>) {}


  // Add this inside your PoolService class
  async findAll(): Promise<Pool[]> {
    // Fetches all pools from the MongoDB collection
    return this.poolModel.find().exec();
  }  

 async findOne(id: string): Promise<Pool> {
    const pool = await this.poolModel.findById(id).exec();
    
    if (!pool) {
      throw new NotFoundException(`Pool with ID ${id} not found`);
    }
    
    return pool;
  }

  async createPool(poolData: any): Promise<Pool> {
    const newPool = new this.poolModel(poolData);
    return newPool.save();
  }
  // ... your existing findAll and findOne methods ...

  async joinPool(poolId: string, userId: string): Promise<Pool> {
    const pool = await this.poolModel.findById(poolId);
    
    if (!pool) {
      throw new NotFoundException('Pool not found');
    }

    // NEW: Check if the user ID is already in the participants array
    if (pool.participants && pool.participants.includes(userId)) {
      throw new BadRequestException('You have already joined this pool!');
    }
    
    if (pool.currentSize >= pool.targetSize) {
      throw new BadRequestException('This pool has already reached its target size');
    }

    // NEW: Add the user to the array and increment the size
    pool.participants.push(userId);
    pool.currentSize += 1;
    
    return pool.save();
  }
} 