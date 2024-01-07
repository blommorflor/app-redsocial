import { UserLogin } from "./userlogin.interface";

export interface LoginResponse {
  token: string;
  user:  UserLogin;
}
