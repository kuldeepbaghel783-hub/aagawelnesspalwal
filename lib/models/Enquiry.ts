
import mongoose, { Schema, models, model } from "mongoose";
import type { Model } from "mongoose";

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 16 },
    service: { type: String, required: true, trim: true, maxlength: 100 },
    preferredTime: { type: String, trim: true, maxlength: 80, default: "" },
    message: { type: String, trim: true, maxlength: 500, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "booked", "closed"],
      default: "new",
      index: true,
    },
    source: { type: String, enum: ["website"], default: "website" },
  },
  { timestamps: true }
);

const Enquiry =
  (models.Enquiry as Model<any> | undefined) ||
  model<any>("Enquiry", EnquirySchema);

export default Enquiry;
