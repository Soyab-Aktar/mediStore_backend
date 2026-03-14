import { User } from "@prisma/client";
import paginationSortingHelper from "../../helper/paginationSortingHelper";
import { prisma } from "../../lib/prisma"

//TODO - Get all users
const getAllUsers = async (paginationData: any) => {
  const { page, limit, skip } = paginationSortingHelper(paginationData);
  const result = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc"
    },
    skip,
    take: limit,
  });
  const total = await prisma.user.count();

  return {
    result: result,
    meta: {
      page,
      limit,
      total
    }
  };
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