import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

const checkCoursePurchasePaymentStatus = async (courseId, userId) => {
  try {
    const checkIfCurrentCourseIsPurchasedByCurrentStudent =
      await client.payment.findFirst({
        where: {
          courseId: courseId,
          userId: userId,
          status: "paid",
        },
      });
    console.log(checkIfCurrentCourseIsPurchasedByCurrentStudent, "backend");
    return !!checkIfCurrentCourseIsPurchasedByCurrentStudent;
  } catch (error) {
    console.error("Error checking course purchase status:", error);
    throw new Error("Internal Server Error");
  }
};

export default checkCoursePurchasePaymentStatus;
