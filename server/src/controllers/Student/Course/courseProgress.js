import { getCurrentCourseProgressWithLectureProgress } from "../../../helpers/course/Progress/lecture-progress.js";
import { PrismaClient } from "../../../imports/imports.js";
const prisma = new PrismaClient();

export const markCurrentLectureAsViewed = async (req, res) => {
  try {
    const { courseId, lectureId } = req.body;
    const userId = req.userId;

    // Find the course progress for the given user and course
    let progress = await getCurrentCourseProgressWithLectureProgress(
      userId,
      courseId,
    );

    if (!progress) {
      // Create a new course progress if it doesn't exist
      progress = await prisma.courseProgress.create({
        data: {
          userId,
          courseId,
          lecturesProgress: {
            create: {
              lectureId,
              viewed: true,
              dateViewed: new Date(),
            },
          },
        },
        include: { lecturesProgress: true },
      });
    } else {
      // Use .find to check if lecture progress already exists
      const existingLectureProgress = Array.isArray(progress.lecturesProgress)
        ? progress.lecturesProgress.find((item) => item.lectureId === lectureId)
        : null;

      if (existingLectureProgress) {
        // Update the existing lecture progress
        await prisma.lectureProgress.update({
          where: { id: existingLectureProgress.id },
          data: {
            viewed: true,
            dateViewed: new Date(),
          },
        });
      } else {
        // Add a new lecture progress if it doesn't exist
        await prisma.lectureProgress.create({
          data: {
            courseProgressId: progress.id,
            lectureId,
            viewed: true,
            dateViewed: new Date(),
          },
        });
      }
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        curriculum: true,
      },
    });

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "course not found",
      });
    }

    // refreshing courseprogress so as we can check all viewed lecture
    // Refresh progress data after possible updates
    progress = await getCurrentCourseProgressWithLectureProgress(
      userId,
      courseId,
    );

    //

    // check all the lectures are viewed or not
    const checkAllViewedLectures =
      progress.lecturesProgress.length === course.curriculum.length &&
      progress.lecturesProgress.every((item) => item.viewed);
    console.log("viewedlectures", checkAllViewedLectures);

    if (checkAllViewedLectures) {
      await prisma.courseProgress.update({
        where: { id: progress.id },
        data: {
          completed: true,
          completionDate: new Date(),
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Lecture marked as viewed",
      data: progress,
    });
  } catch (error) {
    console.error("Error marking lecture as viewed:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// reset course progress
export const resetCourseProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.body;
    console.log(courseId);

    const progress = await getCurrentCourseProgressWithLectureProgress(
      userId,
      courseId,
    );

    if (!progress) {
      res.status(404).json({
        message: "Course progress not found",
      });
      return;
    }

    await prisma.courseProgress.update({
      where: { userId_courseId: { userId, courseId } },
      data: {
        lecturesProgress: {
          deleteMany: {},
        },
        completed: false,
        completionDate: null,
      },
      include: {
        lecturesProgress: true,
      },
    });
    res.status(200).json({
      success: true,
      message: "Course progress reset successfully",
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Failed to reset course progress",
    });
    return;
  }
};
