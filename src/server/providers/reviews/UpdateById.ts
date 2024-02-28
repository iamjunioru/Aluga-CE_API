import { db } from "../../utils/db.server";

import { Review } from "../../models";

interface ReviewResponseWithoutId extends Omit<Review, "id"> {}

interface ResponseUpdateById {
  review: ReviewResponseWithoutId;
}

export const updateById = async (
  id: string,
  review: Review
): Promise<ResponseUpdateById> => {
  const result = await db.reviews.update({
    where: {
      id: id,
    },
    data: {
      user_Id: review.user_Id,
      property_Id: review.property_Id,
      rating: review.rating,
      comment: review.comment,
    },
  });

  if (!result) {
    throw new Error(`Erro ao atualizar avaliação.`);
  }

  return {
    review: {
      user_Id: result.user_Id,
      property_Id: result.property_Id,
      rating: result.rating,
      comment: result.comment,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    },
  };
};
