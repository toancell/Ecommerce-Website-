import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: {
          _id: String,
          name: String,
          slug: String,
          description: String,
          price: Number,
          category: {
            name: String,
            slug: String,
          },
          quantity: Number,
        },
      },
    ],
    payment: Number,
    buyer: String,
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
