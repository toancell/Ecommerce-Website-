import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createOrderController,
  getAllOrdersController,
  getOrdersController,
  orderStatusController,
} from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/create-order", requireSignIn, createOrderController);

//orders
orderRouter.get("/orders/:userId", requireSignIn, getOrdersController);

//all orders
orderRouter.get("/all-orders", requireSignIn, getAllOrdersController);

// order status update
orderRouter.put(
  "/order-status/:orderId",
  requireSignIn,
  //   isAdmin,
  orderStatusController
);
export default orderRouter;
