import express from "express";
import { categoryController } from "./categories.controller";

const router = express.Router();

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategory);


export const categoryRouter = router;