import { User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

//TODO - Get all users
const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
}
//TODO - Update user status
const updateUserStatus = async (id: string, data: Partial<User>) => {
  const updateUser = await prisma.user.update({
    where: {
      id: id
    },
    data
  })
  return updateUser;
}

export const userService = {
  getAllUsers, updateUserStatus,
}