import { Request, Response } from "express";
import { BadRequestError } from "@pkunique/common";
import { User } from "../models/user";
import { generateJwt } from "../services/jwt";
import { Password } from "../services/password";

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError("Invalid Credentials");
  }

  const isPasswordValid = await Password.compare(
    existingUser.password,
    password
  );
  if (!isPasswordValid) {
    throw new BadRequestError("Invalid Credentials");
  }

  const token = generateJwt({
    id: existingUser._id,
    email: existingUser.email,
  });

  req.session = {
    jwt: token,
  };

  return res.status(200).send(existingUser);
};
