import { PrismaClient } from "../../../imports/imports.js";

const prisma = new PrismaClient();

const getAllAvaliableCourses = async (_req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
      },
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export default getAllAvaliableCourses;
