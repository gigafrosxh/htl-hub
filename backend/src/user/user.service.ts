import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { USER_REPOSITORY } from '../db/user/user.repository';

import { PASSWORD_REPOSITORY } from '../db/user/password.repository';
import type { PasswordRepository } from '../db/user/password.repository';
import type { UserRepository } from '../db/user/user.repository';
import { HtlhubPgPasswordRepository } from '../db/user/htlhub.pg.password.repository';
import { HtlhubPgUserRepository } from '../db/user/htlhub.pg.user.repository';
import { HTLHUB_REPOSITORY } from '../db/db.module';
import type { HtlhubRepository } from '../db/core/htlhub.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,

    @Inject(PASSWORD_REPOSITORY)
    private readonly passwordRepository: PasswordRepository,

    @Inject(HTLHUB_REPOSITORY)
    private readonly database: HtlhubRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.database.withTransaction(async (transaction) => {
        const userRepository = new HtlhubPgUserRepository(transaction);
        const passwordRepository = new HtlhubPgPasswordRepository(transaction);
        const createUser = await userRepository.createUser({
          name: createUserDto.name,
          email: createUserDto.email,
        });

        const passwordHash = await bcrypt.hash(createUserDto.password, 12);
        await passwordRepository.createPassword({
          user_id: createUser.id,
          password_hash: passwordHash,
        });

        return createUser;
      });
    } catch (error) {
      if ((error as { code?: string }).code === '23505') {
        throw new ConflictException('Diese E-Mail-Adresse ist bereits registriert.');
      }
      throw error;
    }
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

      const updatedPassword = await this.passwordRepository.updatePassword(id, {
        password_hash: passwordHash,
      });

      if (!updatedPassword) {
        await this.passwordRepository.createPassword({
          user_id: id,
          password_hash: passwordHash,
        });
      }
    }

    return this.userRepository.findUserById(id);
  }

  async remove(id: number) {
    return this.userRepository.deleteUser(id);
  }
}