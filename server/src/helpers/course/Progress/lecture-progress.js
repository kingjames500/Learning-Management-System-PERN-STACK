import { PrismaClient } from "../../../imports/imports.js";

const client = new PrismaClient();

export const getCurrentCourseProgressWithLectureProgress = async (
  userId,
  courseId,
) => {
  try {
    const progress = await client.courseProgress.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
      include: {
        lecturesProgress: true,
      },
    });

    return progress;
  } catch (error) {
    throw new Error(error.message);
  }
};
