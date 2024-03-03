import { Image } from "@prisma/client";
import { db } from "../../utils/db.server";

const uploadImages = async (files: Express.Multer.File[], property_Id: string) => {
  const images: Image[] = [];

  for (const file of files) {
    const { path } = file;
    const image = await db.image.create({
      data: {
        path,
        property: {
          connect: {
            id: property_Id,
          },
        },
      },
    });
    images.push(image);
  }

  return images;
};

export { uploadImages };