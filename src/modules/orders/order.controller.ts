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
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const result = await orderService.getAllOrders(user?.id as string);
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
    const result = await orderService.getAllOrders(user?.id as string);
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
const getAllOrdersByID = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const result = await orderService.getAllOrdersByID(user?.id as string);
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


export const orderController = {
  createOrder, getAllOrders, getAllOrdersByID, getAllSellerOrders
}