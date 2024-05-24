import { BadRequestError, errorHandler } from "../../lib/error.js";

import bcrypt from "bcryptjs";
import User from "../../models/User.js";

export async function signup(req, res) {
  try {
    const body = req.body;
    if (!body.email || !body.name || !body.password) {
      throw new BadRequestError("All fields are required");
    }

    const email = body.email.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const isExists = await User.findOne({
      email: email,
    });
    if (isExists) {
      throw new BadRequestError("User already exists, please login");
    }

    const user = await User.create({
      email: email,
      name: body.name,
      password: hashedPassword,
    });

    res.json({
      message: " User is created",
      data: user,
    });
  } catch (error) {
    errorHandler(error, res);
  }
}
