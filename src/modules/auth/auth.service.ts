import { prisma } from "../../lib/prisma"

// TODO - Get current user
const getCurrentUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: id
    }
  })
  return result;
}

export const authService = {
  getCurrentUser,
}