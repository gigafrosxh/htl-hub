import { Inject, Injectable } from '@nestjs/common';
import type { HtlhubRepository } from '../core/htlhub.repository';
import { UserRepository } from './user.repository';
import { User, UserCreateData, UserUpdateData } from './user.types';

@Injectable()
export class HtlhubPgUserRepository implements UserRepository {
  constructor(
    @Inject('HTLHUB_REPOSITORY')
    private readonly database: HtlhubRepository,
  ) {}

  /**
   * Creates a user in the `users` table.
   *
   * The database generates the user ID and timestamps. The returned value is
   * the complete persisted record, including those generated fields.
   *
   * @param user User name and email address to persist.
   * @returns The newly created user.
   * @throws PostgreSQL errors, for example when the email already exists.
   */
  async createUser(user: UserCreateData): Promise<User> {
    const result = await this.database.query<User>(
      `
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        RETURNING id, name, email, created_at, updated_at
      `,
      [user.name, user.email],
    );

    return result.rows[0];
  }

  /**
   * Loads every user from the `users` table.
   *
   * Results are ordered by ID to provide deterministic output for API clients
   * and callers that display or paginate the returned list.
   *
   * @returns All persisted users, or an empty array when none exist.
   */
  async findAllUsers(): Promise<User[]> {
    const result = await this.database.query<User>(
      `
        SELECT id, name, email, created_at, updated_at
        FROM users
        ORDER BY id
      `,
    );

    return result.rows;
  }

  /**
   * Loads a single user by its database ID.
   *
   * @param id The primary key of the user to find.
   * @returns The matching user, or `null` when the ID does not exist.
   */
  async findUserById(id: number): Promise<User | null> {
    const result = await this.database.query<User>(
      `
        SELECT id, name, email, created_at, updated_at
        FROM users
        WHERE id = $1
      `,
      [id],
    );

    return result.rows[0] ?? null;
  }

  /**
   * Updates the supplied fields of an existing user.
   *
   * Only defined properties are written, so callers can update the name,
   * email, or both without overwriting the other value. The `updated_at`
   * timestamp is refreshed by the same database operation.
   *
   * @param id The primary key of the user to update.
   * @param user Optional name and email values to change.
   * @returns The updated user, or `null` when no matching user exists.
   * @throws PostgreSQL errors, for example when the new email already exists.
   */
  async updateUser(id: number, user: UserUpdateData): Promise<User | null> {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (user.name !== undefined) {
      fields.push(`name = $${values.length + 1}`);
      values.push(user.name);
    }

    if (user.email !== undefined) {
      fields.push(`email = $${values.length + 1}`);
      values.push(user.email);
    }

    if (fields.length === 0) {
      return this.findUserById(id);
    }

    fields.push('updated_at = NOW()');
    values.push(id);

    const result = await this.database.query<User>(
      `
        UPDATE users
        SET ${fields.join(', ')}
        WHERE id = $${values.length}
        RETURNING id, name, email, created_at, updated_at
      `,
      values,
    );

    return result.rows[0] ?? null;
  }

  /**
   * Deletes a user from the `users` table.
   *
   * The foreign-key cascade defined on `user_passwords.user_id` removes the
   * related password record automatically. No password hash is returned.
   *
   * @param id The primary key of the user to delete.
   * @returns A promise that resolves after the delete operation completes.
   */
  async deleteUser(id: number): Promise<void> {
    await this.database.query('DELETE FROM users WHERE id = $1', [id]);
  }
}