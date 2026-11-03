
import mongoose, { Schema, models, model } from "mongoose";
import type { Model } from "mongoose";

const SiteContentSchema = new Schema(
  {
    key: {
      type: String,
      unique: true,
      default: "main",
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const SiteContent =
  (models.SiteContent as Model<any> | undefined) ||
  model<any>("SiteContent", SiteContentSchema);

export default SiteContent;
