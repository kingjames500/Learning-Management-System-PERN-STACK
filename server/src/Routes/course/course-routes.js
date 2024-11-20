import {
  Router,
  createCourse,
  getAllCourses,
  verifyAuthToken,
} from "../../imports/imports.js";

const router = Router();

router.post("/create-course", verifyAuthToken, createCourse);
router.get("/get-all-courses", verifyAuthToken, getAllCourses);

export default router;
