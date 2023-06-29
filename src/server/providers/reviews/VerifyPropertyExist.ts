import { db } from "../../utils/db.server";

export const VerifyPropertyExist = async (property_Id: string) => {
 const property = await db.property.findUnique({
    where: {
      id: property_Id,
    },
  });

  return property;
}
