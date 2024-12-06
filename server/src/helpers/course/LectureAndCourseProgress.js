import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

const courseProgessByCurrentUser = async (userId, courseId) => {
  try {
    const courseProgess = await client.courseProgress.findUnique({
      where: {
        userId_courseId: { userId: userId, courseId: courseId },
      },
    });

    console.log("from helper function", courseProgess);

    return courseProgess;
  } catch (error) {
    throw new Error(error.message);
    return;
  }
};

export default courseProgessByCurrentUser;
