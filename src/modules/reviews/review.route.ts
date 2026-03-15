import express from "express";
import { reviewController } from "./review.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { UserRole } from "../../constants/UserRoles";

const router = express.Router();

router.post(
  "/reviews",
  authMiddleware(UserRole.USER),
  reviewController.createReview
);

router.get(
  "/reviews/medicine/:id",
  reviewController.getMedicineReviews
);

export const reviewRouter = router;