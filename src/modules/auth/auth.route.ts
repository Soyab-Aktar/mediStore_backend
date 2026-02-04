import express from "express";
import { authController } from "./auth.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { UserRole } from "../../constants/UserRoles";

const router = express.Router();

router.get('/me', authMiddleware(UserRole.ADMIN, UserRole.SELLER, UserRole.USER), authController.getCurrentUser);


export const authRouter = router;