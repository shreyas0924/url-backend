import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import { urlRouter } from "./routes/url";
import mongoose from "mongoose";
import "dotenv/config";
import URL from "./models/url";

const PORT: number = 3000;

const app = express();
const uri = process.env.MONGO_URL;
if (!uri) {
  console.error("MongoDB URI is not provided.");
  process.exit(1);
}

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
  } as any)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.use("/url", urlRouter);
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = req.params.shortUrl;

  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortUrl,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );
  if (!entry) {
    // If no matching entry is found, send a 404 Not Found response
    return res.status(404).send("URL not found");
  }
  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
