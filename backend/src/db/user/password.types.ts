export interface UserPassword {
  id: number;
  user_id: number;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserPasswordCreateData {
  user_id: number;
  password_hash: string;
}

export interface UserPasswordUpdateData {
  password_hash: string;
}