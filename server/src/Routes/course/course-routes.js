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

const router = Router();

//instructor-course routes
router.get("/instructor/students", verifyAuthToken, getStudentsByInstructor);
router.get("/home/popular-courses", getPopularCourses);
router.post("/create-course", verifyAuthToken, createCourse);
router.put("/update-course/:courseId", verifyAuthToken, updateCourse);
router.get("/get-course/:courseId", verifyAuthToken, getASingleCourse);
router.get("/get-all-courses", verifyAuthToken, getAllCourses);
router.delete("/delete-course/:courseId", verifyAuthToken, deleteCourse);

// other routes for instructor courses
router.get(
  "/instructor-course-count",
  verifyAuthToken,
  getInstructorCourseCount,
);

export default router;
