import { prisma } from "../../lib/prisma";
import { AppError } from "../../scripts/appError";
import { OrderStatus } from "@prisma/client";

type CreateReviewPayload = {
  medicine_id: string;
  rating: number;
  comment: string;
};

const createReview = async (
  payload: CreateReviewPayload,
  userId: string
) => {

  // 1️⃣ check delivered order exists
  const purchasedMedicine = await prisma.orders.findFirst({
    where: {
      customer_id: userId,
      medicine_id: payload.medicine_id,
      status: OrderStatus.DELIVERED
    }
  });

  if (!purchasedMedicine) {
    throw new AppError(
      "You can review only medicines you purchased and received",
      400
    );
  }

  // 2️⃣ check already reviewed
  const alreadyReviewed = await prisma.reviews.findUnique({
    where: {
      customer_id_medicine_id: {
        customer_id: userId,
        medicine_id: payload.medicine_id
      }
    }
  });

  if (alreadyReviewed) {
    throw new AppError("You already reviewed this medicine", 400);
  }

  // 3️⃣ create review
  const review = await prisma.reviews.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,

      customerRelation: {
        connect: { id: userId }
      },

      medicineRelation: {
        connect: { medicine_id: payload.medicine_id }
      }
    }
  });

  return review;
};


// GET ALL REVIEWS OF A MEDICINE
const getMedicineReviews = async (medicineId: string) => {

  const result = await prisma.reviews.findMany({
    where: {
      medicine_id: medicineId
    },
    include: {
      customerRelation: {
        select: {
          name: true,
          image: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return result;
};

export const reviewService = {
  createReview,
  getMedicineReviews
};