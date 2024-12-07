import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

export const courseEnrollmentByStudent = async (userId, courseId) => {
  // I want to insert into the table because the payment was successful
  try {
    const courseEnrollment = await client.courseEnrollment.create({
      data: {
        userId: userId,
        courseId: courseId,
      },
    });
    console.log(
      " from helper function of course Enrollment ",
      courseEnrollment,
    );
    return courseEnrollment;
  } catch (error) {
    throw new Error(error.message);
  }
};
