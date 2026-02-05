import express from "express";
import { categoryController } from "./categories.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { UserRole } from "../../constants/UserRoles";

const router = express.Router();

router.post('/', authMiddleware(UserRole.ADMIN), categoryController.createCategory);
router.get('/', categoryController.getAllCategory);


export const categoryRouter = router;