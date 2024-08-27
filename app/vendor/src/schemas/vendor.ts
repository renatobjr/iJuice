import mongoose, { ObjectId, Schema } from "mongoose";

type RecipeDocument = Document & {
  _id: ObjectId;
  name: string;
  ingredients: string[];
  steps: string[];
  price: number;
};

export type VendorDocument = Document & {
  _id: ObjectId;
  name: string;
  location: string;
  recipes: RecipeDocument[];
  isOpen: boolean;
  openingTime: string;
  closingTime: string;
};

const VendorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    recipes: { type: Array, required: true },
    isOpen: { type: Boolean, required: true },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Vendor = mongoose.model<VendorDocument>("Vendor", VendorSchema);
