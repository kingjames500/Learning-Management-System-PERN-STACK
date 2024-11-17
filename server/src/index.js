import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

//import routes
import authRoutes from "./routes/auth.js";

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

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Routes for the server only
app.use("/api", authRoutes);
