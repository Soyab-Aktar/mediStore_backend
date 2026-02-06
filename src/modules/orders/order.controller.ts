import { Request, Response } from "express";
import { orderService } from "./order.service";


const createOrder = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const result = await orderService.createOrder(req.body, user?.id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Order Create failed",
    })
  }
}
const getAllUserOrders = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const result = await orderService.getAllUserOrders(user?.id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Orders Fetch failed",
    })
  }
}
const getAllSellerOrders = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const result = await orderService.getAllSellerOrders(user?.id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Orders Fetch failed",
    })
  }
}
const getOrdersByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await orderService.getOrdersByID(id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Order Fetch failed",
    })
  }
}
const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await orderService.updateOrderStatus(id as string, req.body);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Order Status update failed",
    })
  }
}


export const orderController = {
  createOrder, getAllUserOrders, getOrdersByID, getAllSellerOrders, updateOrderStatus
}