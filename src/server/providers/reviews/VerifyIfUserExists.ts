import { db } from "../../utils/db.server";

export const VerifyIfUserExists = async (user_Id: string) => {
  const user = await db.user.findUnique({
    where: {
      id: user_Id,
    },
  });

  return user;
}