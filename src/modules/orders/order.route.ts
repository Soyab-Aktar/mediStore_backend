import express from 'express'
import { orderController } from './order.controller';
import { UserRole } from '../../constants/UserRoles';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();

router.post('/orders', authMiddleware(UserRole.USER), orderController.createOrder);
router.get('/orders', authMiddleware(UserRole.USER), orderController.getAllUserOrders);
router.get('/orders/:id', authMiddleware(UserRole.USER, UserRole.SELLER), orderController.getOrdersByID);
router.get('/seller/orders', authMiddleware(UserRole.SELLER), orderController.getAllSellerOrders);
router.patch('/seller/orders/:id', authMiddleware(UserRole.SELLER), orderController.updateOrderStatus);


export const orderRouter = router;