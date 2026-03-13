import { OrderStatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../scripts/appError";


// TODO - Create Order
type CreateOrderPayload = {
  medicine_id: string;
  quantity: number;
  shippingAddress: string;
};

const createOrder = async (
  payload: CreateOrderPayload,
  userId: string
) => {
  const medicine = await prisma.medicines.findUniqueOrThrow({
    where: {
      medicine_id: payload.medicine_id,
    },
  });

  if (!medicine || !medicine.isActive) {
    throw new AppError("Medicine not available", 404);
  }

  if (medicine.medicine_stock < payload.quantity) {
    throw new AppError("Insufficient stock", 400);
  }

  const price = medicine.medicine_price;
  const totalAmount = price * payload.quantity;

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.orders.create({
      data: {
        quantity: payload.quantity,
        price,
        totalAmount,
        shippingAddress: payload.shippingAddress,

        customer: {
          connect: { id: userId },
        },

        medicine: {
          connect: { medicine_id: medicine.medicine_id },
        },
      },
    });

    await tx.medicines.update({
      where: {
        medicine_id: medicine.medicine_id,
      },
      data: {
        medicine_stock: {
          decrement: payload.quantity,
        },
      },
    });

    return newOrder;
  });

  return order;
};

//TODO - Get all orders - Customers
const getAllUserOrders = async (id: string) => {

  const result = await prisma.orders.findMany({
    where: {
      customer_id: id
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
}
//TODO - Get order by id
const getOrdersByID = async (id: string) => {
  const result = await prisma.orders.findUnique({
    where: {
      order_id: id
    }
  })
  return result;
}

//TODO - Get all orders - Seller
const getAllSellerOrders = async (id: string) => {

  const result = await prisma.orders.findMany({
    where: {
      medicine: {
        seller_id: id
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
}
//TODO - Update order status

type UpdateOrderStatusPayload = {
  status: OrderStatus;
};

const updateOrderStatus = async (
  orderID: string,
  data: UpdateOrderStatusPayload
) => {
  const order = await prisma.orders.findUniqueOrThrow({
    where: {
      order_id: orderID,
    },
  });

  const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
    PLACED: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    PROCESSING: [OrderStatus.SHIPPED],
    SHIPPED: [OrderStatus.DELIVERED],
    DELIVERED: [],
    CANCELLED: [],
  };

  const currentStatus = order.status;
  const nextStatus = data.status;

  if (!allowedTransitions[currentStatus].includes(nextStatus)) {
    throw new AppError(
      `Cannot change order status from ${currentStatus} to ${nextStatus}`, 400
    );
  }

  return prisma.orders.update({
    where: {
      order_id: orderID,
    },
    data: {
      status: nextStatus,
    },
  });
};




export const orderService = {
  createOrder, getAllUserOrders, getOrdersByID, getAllSellerOrders, updateOrderStatus
}