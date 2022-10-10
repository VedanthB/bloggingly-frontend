import { ChangeEvent, FormEvent } from "react";

export interface IParams {
  page: string;
  slug: string;
}

export type InputChange = ChangeEvent<HTMLInputElement>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser extends IUserLogin {
  avatar: string;
  createdAt: string;
  name: string;
  role: string;
  type: string;
  updatedAt: string;
  _id: string;
}
