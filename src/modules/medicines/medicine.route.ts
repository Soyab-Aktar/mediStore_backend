import express from 'express'
import { medicineController } from './medicine.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { UserRole } from '../../constants/UserRoles';
const router = express.Router();

router.get('/medicines', medicineController.getAllMedicines);
router.get('/medicines/:id', medicineController.getMedicineByID);
router.post('/seller/medicines', authMiddleware(UserRole.SELLER, UserRole.ADMIN), medicineController.createMedicine);
router.put('/seller/medicines/:id', authMiddleware(UserRole.SELLER, UserRole.ADMIN), medicineController.updateMedicine);
router.delete('/seller/medicines/:id', authMiddleware(UserRole.SELLER, UserRole.ADMIN), medicineController.deletemedicine);

export const medicineRouter = router;