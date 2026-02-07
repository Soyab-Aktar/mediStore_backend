import { NextFunction, Request, Response } from "express";
import { medicineService } from "./medicine.service";

const createMedicine = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const result = await medicineService.createMedicine(req.body, user?.id as string);
    res.status(201).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err)

  }
}

const getAllMedicines = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await medicineService.getAllMedicines();
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err)

  }
}
const getMedicineByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await medicineService.getMedicineByID(id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err)

  }
}
const updateMedicine = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await medicineService.updateMedicine(id as string, req.body);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err)

  }
}
const deletemedicine = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await medicineService.deletemedicine(id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err)

  }
}

export const medicineController = {
  createMedicine, getAllMedicines, getMedicineByID, deletemedicine, updateMedicine
}