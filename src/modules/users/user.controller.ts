import { Request, Response } from "express";
import { userService } from "./user.service";
import { UserRole } from "../../constants/UserRoles";

//? Get All users
const getAllUsers = async (req: Request, res: Response) => {
  try {

    const result = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      result: result
    })

  } catch (err) {
    res.status(400).json({
      error: "Users Data Retrive Failed",
      details: err,
    })
  }
}
//? Update user status
const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Not Authorised, Please login");
    }
    const id = req.params.id;
    const isAdmin = user.role === UserRole.ADMIN;

    const result = await userService.updateUserStatus(id as string, req.body, isAdmin as boolean);
    res.status(201).json({
      success: true,
      result: result
    })

  } catch (err) {
    res.status(400).json({
      error: "User Status update Failed",
      details: err,
    })
  }
}

export const userController = {
  getAllUsers, updateUserStatus
}