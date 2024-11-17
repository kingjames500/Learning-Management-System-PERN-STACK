import {
  Router,
  authRegisterUser,
  authUserValidation,
} from "../../imports/imports.js";

const router = Router();

router.post("/auth/register", authUserValidation, authRegisterUser);

export default router;
