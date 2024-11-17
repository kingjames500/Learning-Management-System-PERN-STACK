import { checkEmailOrUsernameTakenCheck } from "../../../imports/imports.js";

const authUserValidation = async (req, res, next) => {
  const { email, username, firstName, lastName, password, role } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  //check if the email and username exist in the database
  //if they do, return a message that the email or username already exists
  const emailOrUsername = await checkEmailOrUsernameTakenCheck(email, username);
  if (emailOrUsername) {
    return res
      .status(400)
      .json({ message: "Email or Username already exists" });
  }

  if (!firstName) {
    return res.status(400).json({ message: "First Name is required" });
  }

  if (!lastName) {
    return res.status(400).json({ message: "Last Name is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }
  next();
};

export default authUserValidation;
