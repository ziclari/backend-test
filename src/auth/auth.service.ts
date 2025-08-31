import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SafeUser } from './interfaces/safe-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    return this.userService.create({
      ...createAuthDto,
      password: hashedPassword,
    });
  }

  async validateUser(email: string, pass: string): Promise<SafeUser | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const userObj = user.toObject();
      const { password, ...result } = userObj; //Saca el password del user antes de retornarlo
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { email: user.email, sub: String(user._id) };
    return {
      token_JWT: this.jwtService.sign(payload),
    };
  }
}
