import { Request, Response } from "express";
import { categoryService } from "./categories.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Category Creation failed"
    })
  }
}
const getAllCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.getAllCategory();
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Category Fetch failed"
    })
  }
}


export const categoryController = {
  createCategory, getAllCategory
}