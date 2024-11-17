import { PrismaClient } from "../imports/imports";

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

export default checkEmailOrUsernameTakenCheck;
