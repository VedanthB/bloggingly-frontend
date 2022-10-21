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

export interface IBlogsCategory {
  id: string;
  blogs: IBlog[];
  total: number;
  search: string;
}

export interface IGetBlogsByCategoryParams {
  id: string;
  search: string;
}

export interface IGetBlogsByUserIdParams {
  id: string;
  search: string;
}

export interface IBlogsUser {
  id: string;
  blogs: IBlog[];
  total: number;
  search: string;
}
