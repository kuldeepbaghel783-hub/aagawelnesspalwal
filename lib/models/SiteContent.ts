import { Schema, models, model } from "mongoose";
const SiteContentSchema = new Schema({
  key: { type:String, unique:true, default:"main" },
  content: { type:Schema.Types.Mixed, required:true }
}, { timestamps:true });
export default models.SiteContent || model("SiteContent", SiteContentSchema);
