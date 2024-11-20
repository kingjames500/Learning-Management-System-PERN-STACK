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

export default createCourse;
