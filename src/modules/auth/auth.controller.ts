import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";

//? Get Current User
const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    console.log({ user });
    const result = await authService.getCurrentUser(user?.id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err);
  }

}

export const authController = {
  getCurrentUser,
}