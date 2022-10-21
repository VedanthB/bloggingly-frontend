import { IBlog, IUserRegister } from "./TypeScript";

export const validRegister = (userRegister: IUserRegister) => {
  const { name, email, password, cf_password } = userRegister;

  const errors: string[] = [];

  if (!name) {
    errors.push("Please add your name.");
  } else if (name.length > 10) {
    errors.push("Your name must be at least 10 chars long.");
  }

  if (!email) {
    errors.push("Please add your email.");
  } else if (!validateEmail(email)) {
    errors.push("Please enter a valid email");
  }

  const msg = checkPassword(password, cf_password);

  if (msg) errors.push(msg);

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

export const checkPassword = (password: string, cf_password: string) => {
  if (password.length < 6) {
    return "Password must be at least 6 chars.";
  } else if (password !== cf_password) {
    return "Confirm password did not match.";
  }
};

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
