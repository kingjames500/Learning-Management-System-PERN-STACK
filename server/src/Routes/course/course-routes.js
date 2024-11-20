import {
  Router,
  createCourse,
  getAllCourses,
  deleteCourse,
  verifyAuthToken,
} from "../../imports/imports.js";

const router = Router();

router.post("/create-course", verifyAuthToken, createCourse);
router.get("/get-all-courses", verifyAuthToken, getAllCourses);
router.delete("/delete-course/:courseId", verifyAuthToken, deleteCourse);

export default router;
