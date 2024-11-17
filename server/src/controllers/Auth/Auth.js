import { PrismaClient } from "../../imports/imports";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

const authRegisterUser = async (req, res) => {
  try {
    const { email, username, firstName, lastName, password, role } = req.body;

    const hashPassword = await bcrypt.hash(password, 8);

    await client.user.create({
      data: {
        email,
        username,
        firstName,
        lastName,
        password: hashPassword,
        role,
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.stats(500).json({ message: "Internal server error" });
    return;
  }
};

export default authRegisterUser;
