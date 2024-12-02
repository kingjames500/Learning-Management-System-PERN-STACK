import { PrismaClient } from "../../../imports/imports.js";

const client = new PrismaClient();

// mark current lecture as viewed
const markLectureAsViewed = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Failed to mark lecture as viewed",
    });
    return;
  }
};

// Get current course progress
const getCurrentCourseProgress = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Failed to get course progress",
    });
    return;
  }
};

// reset course progress

const resetCourseProgress = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Failed to reset course progress",
    });
    return;
  }
};

const getCurrentPurchasedCourseByStudent = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    const checkIfCourseIsPurchased = await client.payment.findFirst({
      where: {
        courseId,
        userId,
        status: "requested",
      },
    });

    if (checkIfCourseIsPurchased) {
      const fetchCourse = await client.course.findFirst({
        where: {
          id: courseId,
        },
        include: {
          curriculum: true,
        },
      });

      return res.status(200).json({
        success: true,
        data: fetchCourse,
      });
    } else {
      return res.status(400).json({
        message: "Course not purchased by the student",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export {
  markLectureAsViewed,
  getCurrentCourseProgress,
  resetCourseProgress,
  getCurrentPurchasedCourseByStudent,
};
