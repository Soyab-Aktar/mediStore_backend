import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { UserRole } from "../../constants/UserRoles";

//? Get All users
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const paginationData = {
      page: req.query.page,
      limit: req.query.limit
    }

    const result = await userService.getAllUsers(paginationData);
    res.status(200).json({
      success: true,
      result: result
    })

  } catch (err) {
    next(err);
  }
}
//? Update user status
const updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Not Authorised, Please login");
    }
    const id = req.params.id;
    const isAdmin = user.role === UserRole.ADMIN;

    const result = await userService.updateUserStatus(id as string, req.body);
    res.status(200).json({
      success: true,
      result: result
    })

  } catch (err) {
    next(err);
  }
}

export const userController = {
  getAllUsers, updateUserStatus
}