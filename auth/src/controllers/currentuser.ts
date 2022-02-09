import { Request, Response } from "express";

export const currentuser = async (req: Request, res: Response) => {
  return res.send({ currentUser: req.currentUser || null });
};
