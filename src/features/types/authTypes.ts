import { IUser } from "../../utils/TypeScript";

export const AUTH = "AUTH";

export interface IAuth {
  token?: null | string;
  user?: null | IUser;
}

export interface IAuthType {
  type: typeof AUTH;
  payload: IAuth;
}
