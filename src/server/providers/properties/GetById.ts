import { db } from "../../utils/db.server";
import { Property } from "../../models";

interface ResponseGetById {
  property: Property;
}

export const getById = async (id: string): Promise<ResponseGetById> => {
  const property = await db.property.findUnique({
    where: {
      id: id,
    },
  });

  if (!property) {
    throw new Error(`Propriedade com o id ${id} não encontrada.`);
  }

  return {
    property,
  };
};
