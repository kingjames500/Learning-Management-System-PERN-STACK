import { PrismaClient } from "../../imports/imports.js";

const prisma = new PrismaClient();

const getInstructorCourseCount = async (req, res) => {
  try {
    const userId = req.userId; // Ensure `userId` is passed via middleware for authentication.

    const courseCount = await prisma.course.count({
      where: {
        instructorId: userId, // Count courses specific to the instructor
      },
    });

    res.status(200).json({ count: courseCount });
    console.log(courseCount);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course count" });
  }
};

export { getInstructorCourseCount };
