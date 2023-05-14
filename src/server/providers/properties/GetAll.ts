import { db } from "../../utils/db.server";
import { Property } from "../../models";

interface ResponseGetAll {
  properties: Property[];
  total: number;
}

export const getAll = async (
  limit: number,
  offset: number
): Promise<ResponseGetAll> => {
  const properties = await db.property.findMany({
    take: Number(limit),
    skip: offset,
    select: {
      id: true,
      inscription_number: true,
      type: true,
      description: true,
      rent_price: true,
      cep: true,
      neighborhood: true,
      street_name: true,
      street_number: true,
      total_occupancy: true,
      total_bedrooms: true,
      total_bathrooms: true,
      has_wifi: true,
      has_tv: true,
      has_air_conditioning: true,
      has_washing_machine: true,
      has_kitchen: true,
      has_suite: true,
      has_parking_space: true,
      has_pool: true,
      has_beach_view: true,
      user_Id: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await db.property.count();

  return {
    properties,
    total,
  }
};
