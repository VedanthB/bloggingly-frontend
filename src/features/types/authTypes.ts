import { IUser } from "../../utils/TypeScript";

export const AUTH = "AUTH";

export interface IAuth {
  token?: null | string;
  user?: null | IUser;
}
