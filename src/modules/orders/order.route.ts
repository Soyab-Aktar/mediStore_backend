import express from 'express'
import { orderController } from './order.controller';
import { UserRole } from '../../constants/UserRoles';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();

router.post('/orders', authMiddleware(UserRole.USER), orderController.createOrder);
router.get('/orders', authMiddleware(UserRole.USER), orderController.getAllOrders);
router.get('/orders/:id', authMiddleware(UserRole.USER), orderController.getAllOrdersByID);
router.get('/seller/orders', authMiddleware(UserRole.SELLER), orderController.getAllSellerOrders);


export const orderRouter = router;