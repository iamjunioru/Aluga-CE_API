import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import path from "path";
const server = express();

// Configuração para servir arquivos estáticos da pasta de uploads
server.use(express.static(path.join(__dirname, 'public')));
server.use("/uploads", express.static(path.join(__dirname, "uploads")));


import './shared/services/TranslationsYup';

dotenv.config();

server.use(express.json());
server.use(cors());
server.use(router);

export { server };
