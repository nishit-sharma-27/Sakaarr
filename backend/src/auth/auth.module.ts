import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'YOUR_SUPER_SECRET_KEY', // In production, move this to a .env file
      signOptions: { expiresIn: '1d' }, // Token expires in 1 day
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}