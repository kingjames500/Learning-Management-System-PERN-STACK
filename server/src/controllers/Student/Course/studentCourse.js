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

export default getAllAvaliableCourses;
