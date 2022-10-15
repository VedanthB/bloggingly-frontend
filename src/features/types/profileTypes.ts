import { IAuth } from "./authTypes";

export interface IUpdateUserInfo {
  avatar?: File;
  name: string;
  auth: IAuth;
}
