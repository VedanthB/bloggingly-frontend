import { IComment } from "../../utils/TypeScript";

export interface ICommentState {
  data: IComment[];
  total: number;
}

export interface ICreateCommentData {
  data: IComment;
  token: string;
}

export interface IGetCommentsParams {
  id: string;
  num: number;
}

export interface IUpdateCommentData {
  data: IComment;
  token: string;
}
