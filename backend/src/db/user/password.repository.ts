import {
  UserPassword,
  UserPasswordCreateData,
  UserPasswordUpdateData,
} from './password.types';

export const PASSWORD_REPOSITORY = 'PASSWORD_REPOSITORY';

export interface PasswordRepository {
  /** Stores and returns a pre-hashed password for an existing user. */
  createPassword(data: UserPasswordCreateData): Promise<UserPassword>;
  /** Finds a user's password record, or returns `null` when absent. */
  findPasswordByUserId(userId: number): Promise<UserPassword | null>;
  /** Replaces a user's pre-hashed password, or returns `null` when absent. */
  updatePassword(
    userId: number,
    data: UserPasswordUpdateData,
  ): Promise<UserPassword | null>;
  /** Deletes the password record belonging to a user. */
  deletePassword(userId: number): Promise<void>;
}