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
    console.log(courseId);
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        curriculum: true,
      },
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course fetched successfully",
      course: course,
    });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    return;
  }
};

export { getAllAvaliableCourses, getASingleCourseByStudent };
