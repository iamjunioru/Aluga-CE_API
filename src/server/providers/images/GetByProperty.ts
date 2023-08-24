import { db } from "../../utils/db.server";
import { Image } from "../../models";
import { formatPathToUploadsUrl } from "../../shared/services/formatImagePath";

interface ResponseGetById {
  Image: Image[]
}

export const getAllByProperty = async (id: string): Promise<ResponseGetById> => {
  const imagesFromProperty = await db.image.findMany({
    where: {
      property_Id: id,
    },
    select: {
      id: true,
      path: true,
      property_Id: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!imagesFromProperty) {
    throw new Error(`Erro ao buscar imagens.`);
  }

  // formatar o path para o caminho completo da imagem
  const images = imagesFromProperty.map((image) => ({
    ...image,
    path: formatPathToUploadsUrl(image.path),
  }));

  return {
    Image: images,
  };
};
