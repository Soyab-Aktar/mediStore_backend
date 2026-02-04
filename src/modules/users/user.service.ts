import { User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

//TODO - Get all users
const getAllUsers = async () => {
  const result = await prisma.user.findMany();
  // console.log(result);
  return result;
}
//TODO - Update user status
const updateUserStatus = async (id: string, data: Partial<User>, isAdmin: boolean) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: id
    }
  })
  console.log({ userData });
  if (!isAdmin) {
    throw new Error("You are unauthorised in admin routes");
  }
  const updateUser = await prisma.user.update({
    where: {
      id: id
    },
    data
  })
  return userData;
}

export const userService = {
  getAllUsers, updateUserStatus,
}