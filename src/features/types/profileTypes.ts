import { IAuth } from "./authTypes";

export interface IUpdateUserInfo {
  avatar?: File;
  name: string;
  auth: IAuth;
}

export interface IResetPassword {
  password: string;
  cf_password: string;
  access_token?: string | null;
}
