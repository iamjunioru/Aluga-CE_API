import { Options, diskStorage } from "multer";
import multer from "multer";
import { resolve } from "path";

const multerConfig = {
  dest: resolve(__dirname, "..", "..", "uploads"),
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 2MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo inválido."));
    }
  },
} as Options;

export const upload = multer(multerConfig).array("file", 8);
