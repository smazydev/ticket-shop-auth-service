import { Request, Response, NextFunction } from "express";

export const erroHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log("Something went wrong",err);
    res.status(400);
};
