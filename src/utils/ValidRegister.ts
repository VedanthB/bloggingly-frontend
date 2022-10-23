import { IBlog } from "./TypeScript";

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Valid Blog
export const validCreateBlog = ({
  title,
  content,
  description,
  thumbnail,
  category,
}: IBlog) => {
  const err: string[] = [];

  if (title.trim().length < 10) {
    err.push("Title cant be less than 10 characters.");
  } else if (title.trim().length > 50) {
    err.push("Title cant be more than 50 characters long.");
  }

  if (content.trim().length < 1000) {
    err.push("Content has at least 1000 characters.");
  }

  if (description.trim().length < 50) {
    err.push("Description should be at least 50 characters.");
  } else if (description.trim().length > 200) {
    err.push("Description cant be more than 200 characters long.");
  }

  if (!thumbnail) {
    err.push("Thumbnail cannot be left blank.");
  }

  if (!category) {
    err.push("Category cannot be left blank.");
  }

  return {
    errMsg: err,
    errLength: err.length,
  };
};

// Shallow equality
export const shallowEqual = (object1: any, object2: any) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};
