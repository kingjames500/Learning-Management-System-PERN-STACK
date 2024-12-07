import { PrismaClient } from "../../imports/imports.js";

const client = new PrismaClient();

const userRoleCheck = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await client.user.findUnique({
      where: {
        id: userId,
      },
    });

    console.log(user.role);
    if (user.role !== "instructor") {
      return res.status(403).json({
        message: "You are not authorized to perform this action.",
      });
    }

    next();
  } catch (error) {
    console.error("Error checking user role:", error);
    res.status(500).json({ message: error.message });
  }
};

export default userRoleCheck;
