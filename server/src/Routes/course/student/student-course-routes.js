import {
  Router,
  getAllAvaliableCourses,
  getASingleCourseByStudent,
  verifyAuthToken,
  purchasedCourseDetailsForLearning,
} from "../../../imports/imports.js";

import studentEnrolledCourses from "../../../controllers/Student/Course/EnrolledCourse.js";

const router = Router();

router.get("/student/courses", verifyAuthToken, getAllAvaliableCourses);
router.get(
  "/student/course/:courseId",
  verifyAuthToken,
  getASingleCourseByStudent,
);

router.get(
  "/student/course-learning-progress/:courseId",
  verifyAuthToken,
  purchasedCourseDetailsForLearning,
);

router.get(
  "/student/enrolled-courses",
  verifyAuthToken,
  studentEnrolledCourses,
);

export default router;
