import { db } from "../../utils/db.server";

export const verifyUserExist = async (user_Id: string) => {
  const user = await db.user.findUnique({
    where: {
      id: user_Id,
    },
  });

  return user;
}
