import { PrismaClient } from "../../../imports/imports.js";
import checkCoursePurchasePaymentStatus from "../../../imports/HelperFunctionsImports.js";
import courseProgessByCurrentUser from "../../../helpers/course/LectureAndCourseProgress.js";
const client = new PrismaClient();

const purchasedCourseDetailsForLearning = async (req, res) => {
  const userId = req.userId;
  const { courseId } = req.params;

  try {
    // Checking if the course is purchased by the current user or not
    const studentPurchasedCourses =
      await checkCoursePurchasePaymentStatus(userId);
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
    const courseProgressCheckByCurrentUser = await courseProgessByCurrentUser(
      userId,
      courseId,
    );
    console.log(
      courseProgressCheckByCurrentUser,
      "courseProgressCheckByCurrentUser",
    );

    if (
      !courseProgressCheckByCurrentUser ||
      courseProgressCheckByCurrentUser?.lectureProgress.length === 0
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

    return res.status(200).json({
      success: true,
      message: "Course progress found",
      data: {
        courseDetails: courseProgressCheckByCurrentUser.courseDetails,
        courseProgress: courseProgressCheckByCurrentUser.lectureProgress,
        isPurchased: true,
      },
    });
  } catch (error) {
    console.error("Error fetching course details for learning:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { purchasedCourseDetailsForLearning };
