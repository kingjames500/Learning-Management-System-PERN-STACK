import {
  Router,
  createCourse,
  verifyAuthToken,
} from "../../imports/imports.js";

const router = Router();

router.post("/create-course", verifyAuthToken, createCourse);

export default router;
