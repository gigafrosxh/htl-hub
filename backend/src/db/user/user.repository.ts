import { User, UserCreateData, UserUpdateData } from './user.types';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  /** Creates a user and returns the persisted record with generated fields. */
  createUser(user: UserCreateData): Promise<User>;
  /** Returns all users in a deterministic order. */
  findAllUsers(): Promise<User[]>;
  /** Finds a user by primary key, or returns `null` when absent. */
  findUserById(id: number): Promise<User | null>;
  /** Finds a user by email address, or returns `null` when absent. */
  findUserByEmail(email: string): Promise<User | null>;
  /** Updates defined user fields and returns the result, or `null` when absent. */
  updateUser(id: number, user: UserUpdateData): Promise<User | null>;
  /** Deletes a user by ID and relies on the database cascade for its password. */
  deleteUser(id: number): Promise<void>;
}