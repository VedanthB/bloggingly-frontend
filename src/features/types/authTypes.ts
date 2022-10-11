import { IUser } from "../../utils/TypeScript";

export const AUTH = "AUTH";

export interface IAuth {
  msg?: null | string;
  active_token?: null | string;
  user?: null | IUser;
}
