import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const getAllCoursePurchasedByCurrentUser = async (userId) => {
  try {
    const allStudentPurchasedCourses = await client.courseEnrollment.findMany({
      where: {
        userId: userId,
      },
    });
    return allStudentPurchasedCourses;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getAllCoursePurchasedByCurrentUser;
