import {
  Router,
  getAllAvaliableCourses,
  getASingleCourseByStudent,
  verifyAuthToken,
} from "../../../imports/imports.js";

const router = Router();

router.get("/student/courses", verifyAuthToken, getAllAvaliableCourses);
router.get(
  "/student/course/:courseId",
  verifyAuthToken,
  getASingleCourseByStudent,
);

export default router;
