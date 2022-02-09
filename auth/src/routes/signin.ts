import express from "express";
import { body } from "express-validator";
import { signin } from "../controllers/signin";
import { validateRequest } from "@pkunique/common";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Invalid credentials"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must not be empty"),
  ],
  validateRequest,
  signin
);

export { router as signInRouter };
