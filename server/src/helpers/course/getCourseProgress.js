import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const getCourseProgessByCurrentUser = async (userId, courseId) => {
  try {
    const courseProgress = await client.courseProgress.findUnique({
      where: {
        userId_courseId: { userId: userId, courseId: courseId },
      },
    });
    return courseProgress;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getCourseProgessByCurrentUser;
