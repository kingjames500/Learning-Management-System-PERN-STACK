import { PrismaClient } from "@prisma/client";
import { Router } from "express";

//files import only
import checkEmailOrUsernameTakenCheck from "../helpers/checkEmailOrUsernameTakenCheck";
import comparePassword from "../helpers/comparePassword";
import authUserValidation from "../helpers/Validations/authValidation";
import authRegisterUser from "../controllers/Auth/Auth";

export {
  PrismaClient,
  Router,
  checkEmailOrUsernameTakenCheck,
  comparePassword,
  authUserValidation,
};
