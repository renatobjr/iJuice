import mongoose, { Schema } from "mongoose";

export type OrderDocument = Document & {
  _id?: string;
  customer_id: string;
  withdraw_code: string;
  products: Object[];
  quantity: number;
  status?: string;
};

const OrderSchema: Schema = new Schema(
  {
    customer_id: { type: String, required: true },
    withdraw_code: { type: String, required: true },
    products: { type: [], required: true },
    quantity: { type: Number, required: true },
    status: { type: String, default: "READY", required: true },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<OrderDocument>("Order", OrderSchema);
