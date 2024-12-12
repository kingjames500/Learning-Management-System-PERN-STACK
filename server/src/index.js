import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

//import routes
import authRoutes from "./Routes/Auth/authRouter.js";
import cloudinaryUploads from "./Routes/CloudinaryMediaUpload/cloudinaryMedia.js";
import courseRoutes from "./Routes/course/course-routes.js";
import assignmentGen from "./Routes/openai.js";
import studentCourseRoutes from "./Routes/course/student/student-course-routes.js";
import studentCourseProgressRoutes from "./Routes/course/student/course-progress.js";

import studentCoursePaymentRoutes from "./Routes/course/student/Payments.js";
import apiLimiter from "./middleware/requestLimiter/requestLimiter.js";
const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api", apiLimiter, studentCoursePaymentRoutes);
app.use("/api", apiLimiter, assignmentGen);
app.use("/api", apiLimiter, studentCourseProgressRoutes);

// Routes for the server only
app.use("/api", apiLimiter, authRoutes);
app.use("/api",apiLimiter,  cloudinaryUploads);

// student course routes
app.use("/api", apiLimiter, studentCourseRoutes);

//course routes
app.use("/api", apiLimiter, courseRoutes);
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
