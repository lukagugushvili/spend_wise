import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { userName, email, password } = signUpDto;

    const emailInUse = await this.userService.findOne(email);

    if (emailInUse) throw new BadRequestException('email is already in use');

    const hashedPassword = await bcrypt.hash(password, 10);

    if (typeof hashedPassword !== 'string' || hashedPassword.length === 0) {
      throw new BadRequestException('Error hashing Password');
    }

    await this.userService.create({
      ...signUpDto,
      password: hashedPassword,
    });

    return 'success';
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.findOne(email);

    if (!user) throw new UnauthorizedException('Wrong credentials');

    const arePasswordsEqual = await bcrypt.compare(password, user.password);

    if (!arePasswordsEqual) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const jwtPayLoad = {
      email,
    };

    const access_token = await this.jwtService.sign(jwtPayLoad);

    return { access_token };
  }
}
