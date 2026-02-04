import { Request, Response } from "express";
import { authService } from "./auth.service";

//? Get Current User
const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    console.log({ user });
    const result = await authService.getCurrentUser(user?.id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err
    })
  }

}

export const authController = {
  getCurrentUser,
}