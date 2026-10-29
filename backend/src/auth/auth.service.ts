import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Cast user to 'any' to satisfy TypeScript for MongoDB's _id
    const payload = { sub: (user as any)._id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(email: string, pass: string) {
    const userList = await this.userService.findAll();
    const user = userList.find(u => u.email === email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: (user as any)._id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(user: any) {
    const payload = { 
      sub: user._id, // or user.id
      role: user.role // CRITICAL: Make sure the role is added to the token!
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}