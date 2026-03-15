import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    const result = await reviewService.createReview(
      req.body,
      user?.id as string
    );

    res.status(201).json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};

const getMedicineReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const id = req.params.id;

    const result = await reviewService.getMedicineReviews(id as string);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};

export const reviewController = {
  createReview,
  getMedicineReviews
};