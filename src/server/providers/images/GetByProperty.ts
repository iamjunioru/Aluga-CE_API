import { db } from "../../utils/db.server";
import { Image } from "../../models";

function formatPathToUploadsUrl(filePath: string, baseUrl: string): string {
  const parts = filePath.split("\\");
  const uploadsIndex = parts.findIndex(part => part === "uploads");
  
  if (uploadsIndex !== -1) {
    const fileName = parts[parts.length - 1];
    const formattedUrl = `${baseUrl}/uploads/${encodeURIComponent(fileName)}`;
    return formattedUrl;
  }
  
  return filePath;
}

const baseUrl = "http://localhost:8000"; // Substitua pela sua URL base


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
    path: formatPathToUploadsUrl(image.path, baseUrl),
  }));

  return {
    Image: images,
  };
};
