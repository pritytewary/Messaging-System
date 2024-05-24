import { UnauthorizedError, errorHandler } from "./error.js";
import { verify } from "./jwt.js";

export default function authMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    const user = verify(token);
    if (user.type !== "user")
      throw new UnauthorizedError("This token is only for User");

    req.id = user.id;
    next();
  } catch (error) {
    errorHandler(error, res);
  }
}
