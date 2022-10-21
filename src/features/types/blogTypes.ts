import { IBlog } from "../../utils/TypeScript";

export interface ICreateBlog {
  blog: IBlog;
  token: string;
}

export interface IBlogs {
  _id: string;
  name: string;
  count: number;
  blogs: IBlog[];
}
