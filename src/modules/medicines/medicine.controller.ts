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
    const { search, category, maxPrice, minPrice, sort } = req.query;
    const searchString = typeof search === 'string' ? search : undefined;
    const categoryString = typeof category === 'string' ? category : undefined;
    const maxPriceNum = maxPrice ? Number(maxPrice) : undefined;
    const minPriceNum = minPrice ? Number(minPrice) : undefined;
    const sortString = typeof sort === 'string' ? sort : undefined;

    const result = await medicineService.getAllMedicines({
      search: searchString,
      category: categoryString,
      maxPrice: maxPriceNum,
      minPrice: minPriceNum,
      sort: sortString
    });
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