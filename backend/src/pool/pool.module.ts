import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PoolService } from './pool.service';
import { PoolController } from './pool.controller';
import { Pool, PoolSchema } from './entities/pool.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pool.name, schema: PoolSchema }])
  ],
  controllers: [PoolController],
  providers: [PoolService],
})
export class PoolModule {}
