import { PrismaClient } from "../../../imports/imports.js";

const prisma = new PrismaClient();

//get 3 courses only and do not include the curriculum and instructor
const getPopularCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      take: 3,
      select: {
        image: true,
        title: true,
        pricing: true,
        subtitle: true,
      },
    });

    res
      .status(200)
      .json({
        message: "popular courses fetched successfully",
        popularCourse: courses,
      });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular courses" });
  }
};

export default getPopularCourses;
