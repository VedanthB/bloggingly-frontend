import { ChangeEvent } from "react";

export interface IParams {
  page: string;
  slug: string;
}

export type InputChange = ChangeEvent<HTMLInputElement>;
