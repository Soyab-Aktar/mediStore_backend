import { any, gte, lte } from "better-auth/*"
import { prisma } from "../../lib/prisma"
import { AppError } from "../../scripts/appError"
import paginationSortingHelper from "../../helper/paginationSortingHelper"
import { Medicines } from "@prisma/client"

//TODO - Create medicine
type CreateMedicinePayload = {
  medicine_name: string
  medicine_description: string
  medicine_price: number
  medicine_manufacturer: string
  medicine_stock: number
  category_id: string
}

const createMedicine = async (
  payload: CreateMedicinePayload,
  sellerId: string
) => {
  const { category_id, ...medicineData } = payload

  const result = await prisma.medicines.create({
    data: {
      ...medicineData,

      seller_id: sellerId,

      categoryRelation: {
        connect: {
          category_id: category_id,
        },
      },
    },
  })

  return result
}

//TODO - Get medicines
const getAllMedicines = async (payload: {
  search?: string | undefined;
  category?: string | undefined;
  maxPrice?: number | undefined;
  minPrice?: number | undefined;
  sort?: string | undefined;
}, paginationData: any) => {

  const { page, limit, skip } = paginationSortingHelper(paginationData)

  const where: any = {
    isActive: true
  };

  // Search
  if (payload.search) {
    where.OR = [
      {
        medicine_name: {
          contains: payload.search,
          mode: "insensitive"
        }
      },
      {
        medicine_manufacturer: {
          contains: payload.search,
          mode: "insensitive"
        }
      }
    ];
  }

  // Category filter
  if (payload.category) {
    where.categoryRelation = {
      category_name: {
        equals: payload.category,
        mode: "insensitive"
      }
    }
  }

  //Price filter
  if (payload.minPrice) {
    where.medicine_price = { gte: payload.minPrice };
  }

  if (payload.maxPrice) {
    where.medicine_price = {
      ...where.medicine_price,
      lte: payload.maxPrice
    };
  }

  // sorting
  let orderBy: any = undefined;
  if (payload.sort === "price_asc") {
    orderBy = { medicine_price: "asc" };
  }

  if (payload.sort === "price_desc") {
    orderBy = { medicine_price: "desc" };
  }

  const result = await prisma.medicines.findMany({
    where,
    skip,
    take: limit,
    orderBy
  });
  const total = await prisma.medicines.count({ where });

  return {
    result: result,
    meta: {
      page,
      limit,
      total
    }
  };
};


//TODO - Get medicines by ID
const getMedicineByID = async (id: string) => {
  const result = await prisma.medicines.findUniqueOrThrow({
    where: {
      medicine_id: id,
    }
  });
  return result;
}

//TODO - Update Medicines
const updateMedicine = async (id: string, data: Partial<Medicines>) => {
  await prisma.medicines.findUniqueOrThrow({
    where: {
      medicine_id: id,
    }
  });

  const result = await prisma.medicines.update({
    where: {
      medicine_id: id
    },
    data
  })
  return result;
}

//TODO - Delete medicine by ID
const deletemedicine = async (id: string) => {
  const result = await prisma.medicines.delete({
    where: {
      medicine_id: id,
    }
  });
  return result;
}



export const medicineService = {
  createMedicine, getAllMedicines, getMedicineByID, updateMedicine, deletemedicine
}