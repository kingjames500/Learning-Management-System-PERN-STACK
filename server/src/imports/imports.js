import { PrismaClient } from "@prisma/client";

import { Router } from "express";

//files import only

import comparePassword from "../helpers/comparePassword.js";
import authUserValidation from "../helpers/Validations/Auth/authValidation.js";
import loginAuthValidation from "../helpers/Validations/Auth/loginAuthValidate.js";
import { authRegisterUser, authLoginUser } from "../controllers/Auth/Auth.js";
import {
  checkEmailOrUsernameTakenCheck,
  checkUserExist,
} from "../helpers/checkEmailOrUsernameTakenCheck.js";

export {
  PrismaClient,
  Router,
  comparePassword,
  authUserValidation,
  loginAuthValidation,
  authRegisterUser,
  checkEmailOrUsernameTakenCheck,
  checkUserExist,
  authLoginUser,
};
