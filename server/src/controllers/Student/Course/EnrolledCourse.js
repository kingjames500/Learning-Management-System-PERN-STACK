import { PrismaClient } from "../../../imports/imports.js";

const client = new PrismaClient();

const studentEnrolledCourses = async (req, res) => {
  const userId = req.userId;

  try {
    const enrolledCourses = await client.courseEnrollment.findMany({
      where: {
        userId: userId,
      },
      include: {
        course: true,
      },
    });

    res.status(200).json({
      success: true,
      data: enrolledCourses,
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: error.message });
  }
};

export default studentEnrolledCourses;
