import {
  PrismaClient,
  checkUserExist,
  comparePassword,
} from "../../imports/imports.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

const authRegisterUser = async (req, res) => {
  try {
    const {
      email,
      username,
      firstName,
      lastName,
      password,
      phoneNumber,
      role,
    } = req.body;

    const hashPassword = await bcrypt.hash(password, 8);

    await client.user.create({
      data: {
        email,
        phoneNumber,
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

const authLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await checkUserExist(email);

    if (!user) {
      res.status(400).json({ message: "wrong email or password" });
      return;
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({ message: "wrong username or email" });
      return;
    }

    const accessToken = jwt.sign(user.id, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("authToken", accessToken, { httpOnly: true })
      .json({
        message: "login was successful!",
        user: {
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export { authRegisterUser, authLoginUser };
