import { UserRole } from "../../constants/UserRoles";
import { prisma } from "../../lib/prisma";


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
  const medicine = await prisma.medicines.findUnique({
    where: {
      medicine_id: payload.medicine_id,
    },
  });

  if (!medicine || !medicine.isActive) {
    throw new Error("Medicine not available");
  }

  if (medicine.medicine_stock < payload.quantity) {
    throw new Error("Insufficient stock");
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
const getAllOrders = async (id: string) => {

  const result = await prisma.orders.findMany({
    where: {
      customer_id: id
    }
  });
  return result;
}
//TODO - Get order by id
const getAllOrdersByID = async (id: string) => {
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
    }
  });
  return result;
}



export const orderService = {
  createOrder, getAllOrders, getAllOrdersByID, getAllSellerOrders
}