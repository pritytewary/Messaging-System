import jwt from "jsonwebtoken";
import { UnauthorizedError } from "./error.js";

export const sign = (payload = {}, ttl = 3600) => {
  return jwt.sign(
    {
      ...payload,
      nbf: Math.floor(new Date().getTime() / 1000),
      exp: Math.floor(new Date().getTime() / 1000) + ttl,
    },
    process.env.JWT_SECRET
  );
};

export const verify = (token = "") => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new UnauthorizedError("Token is invalid");
  }
};
