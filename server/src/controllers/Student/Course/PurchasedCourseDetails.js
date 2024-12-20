import getAllCoursePurchasedByCurrentUser from "../../../helpers/course/getAllCoursePurchase.js";
import { getCurrentCourseProgressWithLectureProgress } from "../../../helpers/course/Progress/lecture-progress.js";
import { PrismaClient } from "../../../imports/imports.js";

const client = new PrismaClient();
const purchasedCourseDetailsForLearning = async (req, res) => {
  const userId = req.userId;
  const { courseId } = req.params;

  try {
    // Checking if the course is purchased by the current user or not
    const studentPurchasedCourses =
      await getAllCoursePurchasedByCurrentUser(userId);
    const isCurrentCoursePurchasedByCurrentUserOrNot =
      studentPurchasedCourses?.findIndex((item) => item.courseId === courseId) >
      -1;

    if (!isCurrentCoursePurchasedByCurrentUserOrNot) {
      return res.status(400).json({
        success: false,
        isPurchased: false,
        message: "You need to purchase this course so that you can access it",
      });
    }

    // Checking if the user has started to learn the course or not
    const courseProgressCheckByCurrentUser =
      await getCurrentCourseProgressWithLectureProgress(userId, courseId);

    // console.log("before checking everything", courseProgressCheckByCurrentUser)

    if (
      !courseProgressCheckByCurrentUser ||
      (courseProgressCheckByCurrentUser?.lecturesProgress?.length ?? 0) === 0
    ) {
      const course = await client.course.findUnique({
        where: { id: courseId },
        include: {
          curriculum: true,
        },
      });

      if (!course) {
        return res.status(400).json({
          success: false,
          message: "Course not found",
          data: {
            isPurchased: false,
          },
        });
      }

      return res.status(200).json({
        success: true,
        message: "No Progress found, you can start watching this course",
        data: {
          courseDetails: course,
          courseProgress: [],
          isPurchased: true,
        },
      });
    }

    const courseDetails = await client.course.findUnique({
      where: { id: courseId },
      include: {
        curriculum: true,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Course progress found!",
      data: {
        courseDetails,
        courseProgress: courseProgressCheckByCurrentUser.lecturesProgress,
        completed: courseProgressCheckByCurrentUser.completed,
        completionDate: courseProgressCheckByCurrentUser.completionDate,
        isPurchased: true,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { purchasedCourseDetailsForLearning };
