import {
  Router,
  createCourse,
  getASingleCourse,
  updateCourse,
  getAllCourses,
  deleteCourse,
  getInstructorCourseCount,
  verifyAuthToken,
} from "../../imports/imports.js";

const router = Router();

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
