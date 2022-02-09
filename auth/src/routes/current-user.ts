import express from "express";
import { currentuser } from "../controllers/currentuser";
import { currentUser } from "@pkunique/common";
const router = express.Router();

router.get("/api/users/currentuser", currentUser, currentuser);

export { router as currentUserRouter };
