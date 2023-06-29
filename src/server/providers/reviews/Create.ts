import { db } from "../../utils/db.server";
import { Review } from "../../models";

interface ResponseCreate {
  review: Review;
}

export const create = async (review: Review): Promise<ResponseCreate> => {
  const result = await db.reviews.create({
    data: {
      id: review.id,
      user_Id: review.user_Id,
      property_Id: review.property_Id,
      rating: review.rating,
      comment: review.comment,
    },
  });

  if (!result) {
    throw new Error(`Erro ao criar avaliação.`);
  }

  return {
    review: {
      id: result.id,
      user_Id: result.user_Id,
      property_Id: result.property_Id,
      rating: result.rating,
      comment: result.comment,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    },
  };
}
