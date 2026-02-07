import { NextFunction, Request, Response } from "express";
import { categoryService } from "./categories.service";

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err);
  }
}
const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoryService.getAllCategory();
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err);
  }
}


export const categoryController = {
  createCategory, getAllCategory
}