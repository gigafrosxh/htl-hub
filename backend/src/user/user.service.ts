import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { USER_REPOSITORY } from '../db/user/user.repository';

import { PASSWORD_REPOSITORY } from '../db/user/password.repository';
import type { PasswordRepository } from '../db/user/password.repository';
import type { UserRepository } from '../db/user/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,

    @Inject(PASSWORD_REPOSITORY)
    private readonly passwordRepository: PasswordRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createUser = await this.userRepository.createUser({
      name: createUserDto.name,
      email: createUserDto.email,
    });

    const passwordHash = await bcrypt.hash(
      createUserDto.password,
      12,
    );

    await this.passwordRepository.createPassword({
      user_id: createUser.id,
      password_hash: passwordHash,
    });

    return createUser;
  }

  async findAll() {
    return this.userRepository.findAllUsers();
  }

  async findOne(id: number) {
    return this.userRepository.findUserById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...userData } = updateUserDto;

    if (Object.keys(userData).length > 0) {
      await this.userRepository.updateUser(id, userData);
    }

    if (password) {
      const passwordHash = await bcrypt.hash(password, 12);

      await this.passwordRepository.updatePassword(id, {
        password_hash: passwordHash,
      });
    }

    return this.userRepository.findUserById(id);
  }

  async remove(id: number) {
    return this.userRepository.deleteUser(id);
  }
}