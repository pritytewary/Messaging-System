import {
  BadRequestError,
  errorHandler,
  NotFoundError,
} from "../../lib/error.js";
import { sign } from "../../lib/jwt.js";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";

export async function login(req, res) {
  try {
    const body = req.body;
    if (!body.email || !body.password) {
      throw new BadRequestError("All fields are required");
    }

    const email = body.email.toLowerCase().trim();

    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isSame = await bcrypt.compare(body.password, user.password);
    if (!isSame) {
      throw new BadRequestError("Wrong password provided");
    }

    const signedToken = sign(
      {
        type: "user",
        id: user._id,
      },
      60 * 60 * 24
    );

    res.json({
      message: "Successfully logged in",
      data: signedToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
}
