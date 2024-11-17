import {
  Router,
  authRegisterUser,
  authLoginUser,
  authUserValidation,
  loginAuthValidation,
} from "../../imports/imports.js";

const router = Router();

router.post("/auth/register", authUserValidation, authRegisterUser);
router.post("/auth/login", loginAuthValidation, authLoginUser);

export default router;
