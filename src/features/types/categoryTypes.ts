import { ICategory } from "./../../utils/TypeScript";
export interface ICategoryState {
  categories?: ICategory[];
}

export interface ICreateCategory {
  name: string;
  access_token: string;
}

export interface IUpdateCategory {
  data: ICategory;
  access_token: string;
}

export interface IDeleteCategory {
  id: string;
  access_token: string;
}
