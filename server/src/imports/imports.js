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

import {
  createCourse,
  getAllCourses,
  deleteCourse,
  getASingleCourse,
  updateCourse,
} from "../controllers/Instructor/course/course-controller.js";

import { purchasedCourseDetailsForLearning } from "../controllers/Student/Course/PurchasedCourseDetails.js";
// helper functions are imported here and exported to be used in other files.
import {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} from "../helpers/cloudinary/cloudinary.js";

import { getInstructorCourseCount } from "../controllers/Instructor/instructorCount.js";

// importing middleware for authToken
import verifyAuthToken from "../middleware/AuthToken/authToken.js";
import {
  getASingleCourseByStudent,
  getAllAvaliableCourses,
} from "../controllers/Student/Course/studentCourse.js";
import { getStudentsByInstructor } from "../controllers/Instructor/Student/InstructorStudent.js";
import { checkStudentPaymentStatusFromCallback } from "../controllers/Student/payment/checkPaymentStatus.js";

export {
  PrismaClient,
  checkStudentPaymentStatusFromCallback,
  purchasedCourseDetailsForLearning,
  getAllAvaliableCourses,
  getASingleCourseByStudent,
  getInstructorCourseCount,
  getStudentsByInstructor,
  createCourse,
  getASingleCourse,
  updateCourse,
  getAllCourses,
  deleteCourse,
  Router,
  comparePassword,
  authUserValidation,
  loginAuthValidation,
  authRegisterUser,
  checkEmailOrUsernameTakenCheck,
  checkUserExist,
  authLoginUser,
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
  verifyAuthToken,
};
