import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { router } from "./routes";

const server = express();
import './shared/services/TranslationsYup';

dotenv.config();

server.use(express.json());
server.use(cors());
server.use(router);

export { server };
