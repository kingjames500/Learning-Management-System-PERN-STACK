import { PrismaClient } from "../../../imports/imports.js";
import checkCoursePurchasePaymentStatus from "../../../imports/HelperFunctionsImports.js";
const client = new PrismaClient();

const purchasedCourseDetailsForLearning = async (req, res) => {
  const userId = req.userId;
  const { courseId } = req.params;
  try {
    const isCoursePurchased = await checkCoursePurchasePaymentStatus(
      courseId,
      userId,
    );
    if (!isCoursePurchased) {
      res.status(403).json({
        success: false,
        message:
          "You cannot view the course as you have not purchased this course",
      });
      return;
    }

    const courseDetailsStudent = await client.course.findFirst({
      where: {
        id: courseId,
      },
      include: {
        curriculum: true,
      },
    });

    res.status(200).json({
      success: true,
      data: courseDetailsStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get purchased course details",
    });
    return;
  }
};

export { purchasedCourseDetailsForLearning };
