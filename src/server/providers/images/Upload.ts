import { Image } from "@prisma/client";
import { db } from "../../utils/db.server";
const { createReadStream } = require('fs');
const { createBlob } = require('vercel-blob');

async function uploadImages(files: Express.Multer.File[], propertyId: string) {
  const images = [];

  for (const file of files) {
    const filePath = file.path;
    const readStream = createReadStream(filePath);

    const blob = await createBlob(readStream, {
      contentType: file.mimetype, // Definir tipo de conteúdo com base no arquivo
    });

    const image = await db.image.create({
      data: {
        path: blob.url, // Usar URL fornecida pelo Vercel Blob
        property: {
          connect: {
            id: propertyId,
          },
        },
      },
    });

    images.push(image);
  }

  return images;
}
