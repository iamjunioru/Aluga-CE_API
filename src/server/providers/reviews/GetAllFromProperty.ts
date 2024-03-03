import { db } from "../../utils/db.server";
import { Review } from "../../models";

interface ResponseGetAll {
  reviews: Review[];
  total: number;
}

export const getAllFromProperty = async (
  limit: number,
  offset: number,
  id: string
): Promise<ResponseGetAll> => {
  const reviews = await db.reviews.findMany({
    where: {
      property_Id: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: Number(limit),
    skip: offset,
  });

  const total = await db.reviews.count({
    where: {
      property_Id: id,
    },
  });

  return {
    reviews: reviews.map((review) => ({
      id: review.id,
      user_Id: review.user_Id,
      user_name: review.user_name,
      property_Id: review.property_Id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    })),
    total,
  };
};
