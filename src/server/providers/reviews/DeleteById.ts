import { db } from "../../utils/db.server";
import { Review } from "../../models";

interface ResponseDeleteById {
  review: Review;
}

export const deleteById = async (id: string): Promise<ResponseDeleteById> => {
  const review = await db.reviews.delete({
    where: {
      id: id,
    },
  });

  if (!review) {
    throw new Error(`Avaliação com o id ${id} não encontrada.`);
  }

  return {
    review,
  };
};
