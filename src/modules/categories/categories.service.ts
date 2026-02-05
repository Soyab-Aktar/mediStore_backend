import { prisma } from "../../lib/prisma"

// TODO - Create category
const createCategory = async (payload: {
  category_description?: string,
  category_name: string
}) => {
  const result = await prisma.category.create({
    data: payload
  })

  return result;
}
// TODO - get all category
const getAllCategory = async () => {
  const result = await prisma.category.findMany();
  return result;
}


export const categoryService = {
  createCategory, getAllCategory
}