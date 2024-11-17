import { PrismaClient } from "@prisma/client";

import { Router } from "express";

//files import only

import comparePassword from "../helpers/comparePassword.js";
import authUserValidation from "../helpers/Validations/authValidation.js";
import authRegisterUser from "../controllers/Auth/Auth.js";
import checkEmailOrUsernameTakenCheck from "../helpers/checkEmailOrUsernameTakenCheck.js";

export {
  PrismaClient,
  Router,
  comparePassword,
  authUserValidation,
  authRegisterUser,
  checkEmailOrUsernameTakenCheck,
};
