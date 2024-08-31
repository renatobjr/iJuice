import mongoose, { ObjectId, Schema } from "mongoose";

export type RecipeDocument = Document & {
  _id: ObjectId;
  name: string;
  ingredients: string[];
  steps: string[];
  price: number;
};

export const RecipeSchema: Schema = new Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  price: { type: Number, required: true },
});

export const Vendor = mongoose.model<RecipeDocument>("Recipe", RecipeSchema);
