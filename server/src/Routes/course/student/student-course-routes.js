import {
  Router,
  getAllAvaliableCourses,
  getASingleCourseByStudent,
  verifyAuthToken,
} from "../../../imports/imports.js";

import studentEnrolledCourses from "../../../controllers/Student/Course/EnrolledCourse.js";
import { getCurrentPurchasedCourseByStudent } from "../../../controllers/Student/Course/courseProgress.js";

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
  getCurrentPurchasedCourseByStudent,
);

router.get(
  "/student/enrolled-courses",
  verifyAuthToken,
  studentEnrolledCourses,
);

export default router;
