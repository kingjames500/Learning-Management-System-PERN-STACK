import e from "express";
import { PrismaClient } from "../../../imports/imports.js";

const prisma = new PrismaClient();

const createCourse = async (req, res) => {
  try {
    const userId = req.userId;
    const courseData = req.body;

    if (!Array.isArray(courseData.curriculum)) {
      return res.status(400).json({
        message: "Curriculum must be an array of lectures.",
      });
    }

    const course = await prisma.course.create({
      data: {
        instructorId: userId,
        instructorName: courseData.instructorName,
        title: courseData.title,
        category: courseData.category,
        level: courseData.level,
        primaryLanguage: courseData.primaryLanguage,
        subtitle: courseData.subtitle,
        description: courseData.description,
        image: courseData.image,
        welcomeMessage: courseData.welcomeMessage,
        pricing: courseData.pricing,
        objectives: courseData.objectives,
        isPublished: courseData.isPublished,
        curriculum: {
          create: courseData.curriculum.map((lecture) => ({
            title: lecture.title,
            videoUrl: lecture.videoUrl,
            public_id: lecture.public_id,
            freePreview: lecture.freePreview,
          })),
        },
      },
      include: {
        curriculum: true, // Include curriculum for the created course
      },
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await prisma.course.findMany({
      where: {
        instructorId: userId,
      },
      include: {
        curriculum: true,
      },
    });

    res.status(200).json({
      message: "Courses fetched successfully",
      courses: courses,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    return;
  }
};

const getASingleCourse = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.params;

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        instructorId: userId,
      },
      include: {
        curriculum: true, // Include curriculum for the created course
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
    res.status(500).json({ message: error.message });
    return;
  }
};

const updateCourse = async (req, res) => {
  try {
    const userId = req.userId; // Ensure this is provided by middleware
    const { courseId } = req.params;
    const courseData = req.body;

    // Validate required fields
    if (
      !courseData.title ||
      !courseData.category ||
      !Array.isArray(courseData.curriculum)
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: title, category, or curriculum must be an array.",
      });
    }

    // Check if course exists and belongs to the user
    const existingCourse = await prisma.course.findFirst({
      where: { id: courseId, instructorId: userId },
    });

    if (!existingCourse) {
      return res
        .status(404)
        .json({ message: "Course not found or unauthorized access." });
    }

    // Update the course
    const updatedCourse = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        instructorId: userId,
        instructorName: courseData.instructorName,
        title: courseData.title,
        category: courseData.category,
        level: courseData.level,
        primaryLanguage: courseData.primaryLanguage,
        subtitle: courseData.subtitle,
        description: courseData.description,
        image: courseData.image,
        welcomeMessage: courseData.welcomeMessage,
        pricing: courseData.pricing,
        objectives: courseData.objectives,
        isPublished: courseData.isPublished,
        curriculum: {
          upsert: courseData.curriculum.map((lecture) => ({
            where: { id: lecture.id || undefined }, // If lecture ID exists, update it
            create: {
              title: lecture.title,
              videoUrl: lecture.videoUrl,
              public_id: lecture.public_id,
              freePreview: lecture.freePreview,
            },
            update: {
              title: lecture.title,
              videoUrl: lecture.videoUrl,
              public_id: lecture.public_id,
              freePreview: lecture.freePreview,
            },
          })),
        },
      },
      include: {
        curriculum: true, // Include the updated curriculum
      },
    });

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      message: "An unexpected error occurred while updating the course.",
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    await prisma.course.delete({
      where: {
        id: courseId,
        instructorId: userId,
      },
    });

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

// getting popular courses by student enrollment

const getPopularCourses = async (_req, res) => {
  try {
    const popularCourses = await prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { students: { _count: "desc" } },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        category: true,
        instructorName: true,
        level: true,
        primaryLanguage: true,
        subtitle: true,
        pricing: true,
        objectives: true,
        date: true,
      },
    });
    res.status(200).json({ success: true, data: popularCourses });
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  createCourse,
  getAllCourses,
  deleteCourse,
  getASingleCourse,
  updateCourse,
  getPopularCourses,
};
