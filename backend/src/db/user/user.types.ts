export interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreateData {
  name: string;
  email: string;
}

export interface UserUpdateData {
  name?: string;
  email?: string;
}