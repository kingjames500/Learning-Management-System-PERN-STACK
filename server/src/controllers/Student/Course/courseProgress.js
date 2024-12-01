import { PrismaClient } from "../../../imports/imports.js";

const client = new PrismaClient();

// mark current lecture as viewed
const markLectureAsViewed = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Failed to mark lecture as viewed",
    });
    return;
  }
};

// Get current course progress
const getCurrentCourseProgress = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Failed to get course progress",
    });
    return;
  }
};

// reset course progress

const resetCourseProgress = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Failed to reset course progress",
    });
    return;
  }
};
