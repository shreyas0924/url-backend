import { Request, Response } from "express";
import URL, { IURL } from "../models/url";
import { v4 as uuidv4 } from "uuid";
interface URLType {
  url: string;
}

function generateShortUUID(): string {
  // Generate a standard UUID
  const uuid = uuidv4();
  // Take the first 8 characters
  const shortUUID = uuid.slice(0, 8);
  return shortUUID;
}

// Usage
const shortUUID = generateShortUUID();

export async function handleNewShortUrl(req: Request, res: Response) {
  const body: URLType = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const shortId = shortUUID;
  try {
    const newUrl: IURL = await URL.create({
      shortId,
      redirectURL: body.url,
      visitHistory: [],
    });
    const shortenedId = newUrl.shortId;
    console.log(`Short ID : ${shortenedId}`);
    return res.status(201).json({ id: shortenedId });
  } catch (error) {
    console.error("Error generating short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
