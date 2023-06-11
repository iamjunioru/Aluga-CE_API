import { db } from "../../utils/db.server";
import { Property } from "../../models";

interface ResponseCreate {
  property: Property;
}

export const create = async (property: Property): Promise<ResponseCreate> => {
  const propertyExists = await db.property.findUnique({
    where: {
      inscription_number: property.inscription_number,
    },
  });

  if (propertyExists) {
    throw new Error(
      `Propriedade com o número de inscrição ${property.inscription_number} já existe.`
    );
  }

  const result = await db.property.create({
    data: {
      id: property.id,
      inscription_number: property.inscription_number,
      type: property.type,
      description: property.description,
      rent_price: property.rent_price,
      cep: property.cep,
      neighborhood: property.neighborhood,
      street_name: property.street_name,
      street_number: property.street_number,
      total_occupancy: property.total_occupancy,
      total_bedrooms: property.total_bedrooms,
      total_bathrooms: property.total_bathrooms,
      has_wifi: property.has_wifi,
      has_tv: property.has_tv,
      has_air_conditioning: property.has_air_conditioning,
      has_washing_machine: property.has_washing_machine,
      has_kitchen: property.has_kitchen,
      has_suite: property.has_suite,
      has_parking_space: property.has_parking_space,
      has_pool: property.has_pool,
      has_beach_view: property.has_beach_view,
      user_Id: property.user_Id,
    },
  });

  if (!result) {
    throw new Error(`Erro ao criar propriedade.`);
  }

  return {
    property: {
      id: result.id,
      inscription_number: result.inscription_number,
      type: result.type,
      description: result.description,
      rent_price: result.rent_price,
      cep: result.cep,
      neighborhood: result.neighborhood,
      street_name: result.street_name,
      street_number: result.street_number,
      total_occupancy: result.total_occupancy,
      total_bedrooms: result.total_bedrooms,
      total_bathrooms: result.total_bathrooms,
      has_wifi: result.has_wifi,
      has_tv: result.has_tv,
      has_air_conditioning: result.has_air_conditioning,
      has_washing_machine: result.has_washing_machine,
      has_kitchen: result.has_kitchen,
      has_suite: result.has_suite,
      has_parking_space: result.has_parking_space,
      has_pool: result.has_pool,
      has_beach_view: result.has_beach_view,
      user_Id: result.user_Id,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    },
  };
};
