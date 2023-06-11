import { db } from "../../utils/db.server";
import { Property } from "../../models";

interface ResponseDeleteById {
  property: Property;
}

export const deleteById = async (id: string): Promise<ResponseDeleteById> => {
  const property = await db.property.delete({
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
