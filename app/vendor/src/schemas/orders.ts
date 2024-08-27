import mongoose, { Schema } from "mongoose";

export type OrderDocument = Document & {
  id: string;
  userId: string;
  withdrawalCode: string;
  status: string;
  item: typeof Schema.ObjectId;
  quantity: number;
};

const OrderSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    userId: { type: String, required: true },
    withdrawalCode: { type: String, required: true },
    status: { type: String, required: true },
    item: { type: Schema.ObjectId, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<OrderDocument>("Order", OrderSchema);
