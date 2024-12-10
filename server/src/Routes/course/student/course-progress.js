import {
  markCurrentLectureAsViewed,
  resetCourseProgress,
} from "../../../controllers/Student/Course/courseProgress.js";
import { Router, verifyAuthToken } from "../../../imports/imports.js";

const router = Router();

router.post(
  "/student/course/marking-lecture-as-viewed",
  verifyAuthToken,
  markCurrentLectureAsViewed,
);

router.post(
  "/student/course/reset-course-progress",
  verifyAuthToken,
  resetCourseProgress,
);

export default router;
