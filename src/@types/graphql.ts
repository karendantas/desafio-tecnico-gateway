import { User } from "./user";

export interface LoginResponse {
  signIn: {
    token: string;
    user: User;
  };
}
