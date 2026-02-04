import express from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { UserRole } from "../../constants/UserRoles";

const router = express.Router();

router.get('/', userController.getAllUsers);
router.patch('/:id', authMiddleware(UserRole.ADMIN), userController.updateUserStatus);


export const userRouter = router;