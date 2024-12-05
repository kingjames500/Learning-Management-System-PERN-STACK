import { PrismaClient } from "../../../imports/imports.js";

const client = new PrismaClient();

const studentEnrolledCourses = async (req, res) => {
  const userId = req.userId;

  try {
    const paidEnrolledCourses = await client.courseEnrollment.findMany({
      where: {
        userId: userId,
        course: {
          payments: {
            some: {
              userId: userId,
              status: "paid",
            },
          },
        },
      },
      include: {
        course: {
          select: {
            title: true,
            image: true,
            instructorName: true,
            pricing: true,
            description: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: paidEnrolledCourses,
    });
  } catch (error) {
    console.error("Error fetching enrolled courses with paid status:", error);
    res.status(500).json({ message: error.message });
  }
};

export default studentEnrolledCourses;
