import bcrypt from "bcryptjs";

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

export default comparePassword;
