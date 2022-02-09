import { Request, Response } from "express";
import { BadRequestError } from "@pkunique/common";
import { User } from "../models/user";
import { generateJwt } from "../services/jwt";

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check for existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("Email is already in use");
  }

  // Create the User

  const user = User.build({ email, password });
  await user.save();

  const token = generateJwt({
    id: user._id,
    email: user.email,
  });

  req.session = {
    jwt: token,
  };

  return res.status(201).send(user);
};
