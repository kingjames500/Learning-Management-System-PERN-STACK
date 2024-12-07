import {
  Router,
  createCourse,
  getASingleCourse,
  updateCourse,
  getAllCourses,
  deleteCourse,
  getInstructorCourseCount,
  verifyAuthToken,
  getStudentsByInstructor,
} from "../../imports/imports.js";

import { getPopularCourses } from "../../controllers/Instructor/course/course-controller.js";
import userRoleCheck from "../../middleware/UserRoleValidation/userRoleCheck.js";

const router = Router();

//instructor-course routes
router.get("/instructor/students", verifyAuthToken, getStudentsByInstructor);
router.get("/home/popular-courses", getPopularCourses);
router.post("/create-course", verifyAuthToken, userRoleCheck, createCourse);
router.put(
  "/update-course/:courseId",
  verifyAuthToken,
  userRoleCheck,
  updateCourse,
);
router.get("/get-course/:courseId", verifyAuthToken, getASingleCourse);
router.get("/get-all-courses", verifyAuthToken, getAllCourses);
router.delete(
  "/delete-course/:courseId",
  verifyAuthToken,
  userRoleCheck,
  deleteCourse,
);

// other routes for instructor courses
router.get(
  "/instructor-course-count",
  verifyAuthToken,
  getInstructorCourseCount,
);

export default router;
