import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

const checkCoursePurchasePaymentStatus = async (userId) => {
  try {
    const coursePurchase = await client.courseEnrollment.findMany({
      where: {
        userId: userId,
      },
    });
    return coursePurchase;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default checkCoursePurchasePaymentStatus;
