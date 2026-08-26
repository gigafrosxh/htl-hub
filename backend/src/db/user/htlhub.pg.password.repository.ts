import { Inject, Injectable } from '@nestjs/common';
import type { HtlhubRepository } from '../core/htlhub.repository';
import { PasswordRepository } from './password.repository';
import {
  UserPassword,
  UserPasswordCreateData,
  UserPasswordUpdateData,
} from './password.types';

@Injectable()
export class HtlhubPgPasswordRepository implements PasswordRepository {
  constructor(
    @Inject('HTLHUB_REPOSITORY')
    private readonly database: Pick<HtlhubRepository, 'query'>,
  ) {}

  /**
   * Stores a password hash in the `user_passwords` table.
   *
   * Password hashing belongs to the authentication/service layer. This
   * repository accepts only an already generated hash and never hashes or
   * persists a plaintext password itself.
   *
   * @param data User ID and password hash to persist.
   * @returns The newly created password record.
   * @throws PostgreSQL errors when the user does not exist or already has a
   * password record.
   */
  async createPassword(data: UserPasswordCreateData): Promise<UserPassword> {
    const result = await this.database.query<UserPassword>(
      `
        INSERT INTO user_passwords (user_id, password_hash)
        VALUES ($1, $2)
        RETURNING id, user_id, password_hash, created_at, updated_at
      `,
      [data.user_id, data.password_hash],
    );

    return result.rows[0];
  }

  /**
   * Loads the password record belonging to a user.
   *
   * @param userId The ID of the user whose password hash is requested.
   * @returns The password record, or `null` when no hash has been stored.
   */
  async findPasswordByUserId(userId: number): Promise<UserPassword | null> {
    const result = await this.database.query<UserPassword>(
      `
        SELECT id, user_id, password_hash, created_at, updated_at
        FROM user_passwords
        WHERE user_id = $1
      `,
      [userId],
    );

    return result.rows[0] ?? null;
  }

  /**
   * Replaces an existing user's password hash.
   *
   * The update timestamp is refreshed in the same statement. Supplying a
   * plaintext password is a security error; the value must already be hashed.
   *
   * @param userId The ID of the user whose hash should be replaced.
   * @param data The new password hash.
   * @returns The updated password record, or `null` when no record exists.
   */
  async updatePassword(
    userId: number,
    data: UserPasswordUpdateData,
  ): Promise<UserPassword | null> {
    const result = await this.database.query<UserPassword>(
      `
        UPDATE user_passwords
        SET password_hash = $1, updated_at = NOW()
        WHERE user_id = $2
        RETURNING id, user_id, password_hash, created_at, updated_at
      `,
      [data.password_hash, userId],
    );

    return result.rows[0] ?? null;
  }

  /**
   * Removes the password record belonging to a user.
   *
   * @param userId The ID of the user whose password record should be removed.
   * @returns A promise that resolves after the delete operation completes.
   */
  async deletePassword(userId: number): Promise<void> {
    await this.database.query(
      'DELETE FROM user_passwords WHERE user_id = $1',
      [userId],
    );
  }
}