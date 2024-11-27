import {
  Router,
  getAllAvaliableCourses,
  verifyAuthToken,
} from "../../../imports/imports.js";

const router = Router();

router.get("/student/courses", verifyAuthToken, getAllAvaliableCourses);

export default router;
