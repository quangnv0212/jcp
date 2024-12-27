export interface ApiResponse<T> {
  message: string;
  result: T;
}
export type UserType = {
  avatar: string;
  bio: string;
  cover_photo: string;
  created_at: string;
  date_of_birth: string;
  email: string;
  username: string;
  verify: number;
  website: string;
  name: string;
};
