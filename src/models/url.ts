import { model, Schema, Model, Document } from "mongoose";

export interface IURL extends Document {
  shortId: string;
  redirectURL: string;
  visitHistory: { timestamp: number }[];
}

const urlSchema: Schema<IURL> = new Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const URL: Model<IURL> = model<IURL>("URL", urlSchema);

export default URL;
