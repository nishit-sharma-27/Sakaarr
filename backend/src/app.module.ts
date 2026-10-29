import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PoolModule } from './pool/pool.module';
import { BidModule } from './bid/bid.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Connect to local MongoDB
    MongooseModule.forRoot('mongodb://localhost:27017/sakaar_db'),
    UserModule,
    PoolModule,
    BidModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}