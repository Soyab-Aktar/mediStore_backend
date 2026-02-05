import { Request, Response } from "express";
import { medicineService } from "./medicine.service";

const createMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const result = await medicineService.createMedicine(req.body, user?.id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Medicine Create failed"
    })
  }
}

const getAllMedicines = async (req: Request, res: Response) => {
  try {
    const result = await medicineService.getAllMedicines();
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Medicines Fetched failed"
    })
  }
}
const getMedicineByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await medicineService.getMedicineByID(id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Medicines Fetched failed"
    })
  }
}
const updateMedicine = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await medicineService.updateMedicine(id as string, req.body);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Medicines Update failed",
    })
  }
}
const deletemedicine = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await medicineService.deletemedicine(id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Medicines Delete failed",
    })
  }
}

export const medicineController = {
  createMedicine, getAllMedicines, getMedicineByID, deletemedicine, updateMedicine
}