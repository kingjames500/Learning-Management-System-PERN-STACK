import { PrismaClient } from "../imports/imports.js";

const client = new PrismaClient();

const checkEmailOrUsernameTakenCheck = async (email, username) => {
  return await client.user.findFirst({
    where: {
      OR: [
        {
          email,
        },
        {
          username,
        },
      ],
    },
  });
};

const checkUserExist = async (email) => {
  return await client.user.findFirst({
    where: {
      email,
    },
  });
};

export { checkEmailOrUsernameTakenCheck, checkUserExist };
