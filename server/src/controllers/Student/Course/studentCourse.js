import { PrismaClient } from "../../../imports/imports.js";

const prisma = new PrismaClient();

const getAllAvaliableCourses = async (_req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        curriculum: true,
        students: {
          include: {
            user: true,
          },
        },
      },
    });
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
};

const getASingleCourseByStudent = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        curriculum: true,
        students: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    return;
  }
};

export { getAllAvaliableCourses, getASingleCourseByStudent };
