import { db } from "../../utils/db.server";
import { Property } from "../../models";
import { formatPathToUploadsUrl } from "../../shared/services/formatImagePath";

interface ResponseGetAll {
  properties: Property[];
  total: number;
}

export const getAll = async (
  limit: number,
  offset: number,
  {
    propertyType,
    minRentPrice,
    maxRentPrice,
    totalOccupancy,
    totalBedrooms,
    totalBathrooms,
    hasWifi,
    hasTv,
    hasAirConditioning,
    hasWashingMachine,
    hasKitchen,
    hasSuite,
    hasParkingSpace,
    hasPool,
    hasBeachView,
  }: {
    propertyType?: string;
    minRentPrice?: string;
    maxRentPrice?: string;
    totalOccupancy?: number;
    totalBedrooms?: number;
    totalBathrooms?: number;
    hasWifi?: boolean;
    hasTv?: boolean;
    hasAirConditioning?: boolean;
    hasWashingMachine?: boolean;
    hasKitchen?: boolean;
    hasSuite?: boolean;
    hasParkingSpace?: boolean;
    hasPool?: boolean;
    hasBeachView?: boolean;
  }
): Promise<ResponseGetAll> => {
  const where: any = {};

  if (propertyType) where.type = propertyType;
  if (minRentPrice !== undefined) where.rent_price = { gte: minRentPrice };
  if (maxRentPrice !== undefined) {
    if (where.rent_price === undefined) where.rent_price = {};
    where.rent_price.lte = maxRentPrice;
  }
  if (totalOccupancy !== undefined) where.total_occupancy = Number(totalOccupancy);
  if (totalBedrooms !== undefined) where.total_bedrooms = Number(totalBedrooms);
  if (totalBathrooms !== undefined) where.total_bathrooms = Number(totalBathrooms);
  if (hasWifi !== undefined) where.has_wifi = Boolean(hasWifi);
  if (hasTv !== undefined) where.has_tv = Boolean(hasTv);
  if (hasAirConditioning !== undefined) where.has_air_conditioning = Boolean(hasAirConditioning);
  if (hasWashingMachine !== undefined) where.has_washing_machine = Boolean(hasWashingMachine);
  if (hasKitchen !== undefined) where.has_kitchen = Boolean(hasKitchen);
  if (hasSuite !== undefined) where.has_suite = Boolean(hasSuite);
  if (hasParkingSpace !== undefined) where.has_parking_space = Boolean(hasParkingSpace);
  if (hasPool !== undefined) where.has_pool = Boolean(hasPool);
  if (hasBeachView !== undefined) where.has_beach_view = Boolean(hasBeachView);

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
    where
  });

  const propertyIds = properties.map(property => property.id);

const propertyImages = await db.image.findMany({
  where: {
    property_Id: {
      in: propertyIds,
    },
  },
  select: {
    id: true,
    path: true,
    property_Id: true,
    createdAt: true,
    updatedAt: true,
  },
});

const propertiesWithImages = properties.map(property => {
  const imagesForProperty = propertyImages.filter(image => image.property_Id === property.id);
  return {
    ...property,
    images: imagesForProperty.map(image => ({
      ...image,
      path: formatPathToUploadsUrl(image.path),
    })),
  };
});

  

  const total = await db.property.count();

  return {
    properties: propertiesWithImages,
    total,
  };
};
