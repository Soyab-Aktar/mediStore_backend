import { Medicines } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

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
const getAllMedicines = async () => {
  const result = await prisma.medicines.findMany({
    where: {
      isActive: true
    }
  });
  return result;
}


//TODO - Get medicines by ID
const getMedicineByID = async (id: string) => {
  const result = await prisma.medicines.findUnique({
    where: {
      medicine_id: id,
    }
  });
  return result;
}

//TODO - Update Medicines
const updateMedicine = async (id: string, data: Partial<Medicines>) => {
  const medicineData = await prisma.medicines.findUnique({
    where: {
      medicine_id: id,
    }
  });

  if (!medicineData) {
    throw new Error("Medicine Not found, plesse check proprly");
  }

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