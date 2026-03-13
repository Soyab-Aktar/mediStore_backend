import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";


const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const result = await orderService.createOrder(req.body, user?.id as string);
    res.status(201).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err);
  }
}
const getAllUserOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const paginationData = {
      page: req.query.page,
      limit: req.query.limit
    }
    const result = await orderService.getAllUserOrders(user?.id as string, paginationData);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err);
  }
}
const getAllSellerOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const paginationData = {
      page: req.query.page,
      limit: req.query.limit
    }
    const result = await orderService.getAllSellerOrders(user?.id as string, paginationData);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err);
  }
}
const getOrdersByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await orderService.getOrdersByID(id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err);
  }
}
const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await orderService.updateOrderStatus(id as string, req.body);
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    next(err);
  }
}


export const orderController = {
  createOrder, getAllUserOrders, getOrdersByID, getAllSellerOrders, updateOrderStatus
}