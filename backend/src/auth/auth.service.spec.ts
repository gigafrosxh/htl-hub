import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import type { PasswordRepository } from '../db/user/password.repository';
import type { UserRepository } from '../db/user/user.repository';

jest.mock('bcrypt');

describe('AuthService', () => {
  const user = {
    id: 7,
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    created_at: new Date(),
    updated_at: new Date(),
  };
  const passwordRecord = {
    id: 1,
    user_id: 7,
    password_hash: 'hashed-password',
    created_at: new Date(),
    updated_at: new Date(),
  };
  let service: AuthService;
  let jwtService: { signAsync: jest.Mock };
  let userRepository: { findUserByEmail: jest.Mock };
  let passwordRepository: { findPasswordByUserId: jest.Mock };

  beforeEach(() => {
    jwtService = { signAsync: jest.fn().mockResolvedValue('jwt-token') };
    userRepository = { findUserByEmail: jest.fn() };
    passwordRepository = { findPasswordByUserId: jest.fn() };
    service = new AuthService(
      jwtService as unknown as JwtService,
      userRepository as unknown as UserRepository,
      passwordRepository as unknown as PasswordRepository,
    );
    jest.clearAllMocks();
  });

  it('returns a JWT for valid credentials', async () => {
    userRepository.findUserByEmail.mockResolvedValue(user);
    passwordRepository.findPasswordByUserId.mockResolvedValue(passwordRecord);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await expect(service.login('ADA@EXAMPLE.COM', 'password123')).resolves.toEqual({
      access_token: 'jwt-token',
      user,
    });
    expect(userRepository.findUserByEmail).toHaveBeenCalledWith('ada@example.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed-password');
    expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: 7, email: user.email });
  });

  it('rejects an unknown email', async () => {
    userRepository.findUserByEmail.mockResolvedValue(null);

    await expect(service.login('unknown@example.com', 'password123')).rejects.toBeInstanceOf(UnauthorizedException);
    expect(passwordRepository.findPasswordByUserId).not.toHaveBeenCalled();
  });

  it('rejects an incorrect password', async () => {
    userRepository.findUserByEmail.mockResolvedValue(user);
    passwordRepository.findPasswordByUserId.mockResolvedValue(passwordRecord);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(service.login(user.email, 'wrong-password')).rejects.toBeInstanceOf(UnauthorizedException);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });
});
