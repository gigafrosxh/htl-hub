import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  PASSWORD_REPOSITORY,
} from '../db/user/password.repository';
import type { PasswordRepository } from '../db/user/password.repository';
import { USER_REPOSITORY } from '../db/user/user.repository';
import type { UserRepository } from '../db/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(PASSWORD_REPOSITORY)
    private readonly passwordRepository: PasswordRepository,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email.toLowerCase());
    const passwordRecord = user
      ? await this.passwordRepository.findPasswordByUserId(user.id)
      : null;

    if (
      !user ||
      !passwordRecord ||
      !(await bcrypt.compare(password, passwordRecord.password_hash))
    ) {
      throw new UnauthorizedException('Ungültige E-Mail oder Passwort.');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return { access_token: accessToken, user };
  }
}