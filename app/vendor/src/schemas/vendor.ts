import mongoose, { ObjectId, Schema } from "mongoose";
import { RecipeDocument, RecipeSchema } from "@/vendor/schemas/recipe";

export type VendorDocument = Document & {
  _id: ObjectId;
  name: string;
  location: string;
  host: String;
  recipes: RecipeDocument[];
  is_open: boolean;
  opening_time: string;
  closing_time: string;
};

const VendorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    host: { type: String, required: true },
    recipes: { type: [RecipeSchema], required: true },
    is_open: { type: Boolean, required: true },
    opening_time: { type: String, required: true },
    closing_time: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Vendor = mongoose.model<VendorDocument>("Vendor", VendorSchema);
