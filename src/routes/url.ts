import express from "express";
import { handleNewShortUrl } from "../controllers/url";
const router = express.Router();

export const urlRouter = router.post("/", handleNewShortUrl);
