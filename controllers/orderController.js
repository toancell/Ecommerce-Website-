import orderModel from "../models/orderModel.js";

export const createOrderController = async (req, res) => {
  try {
    //alidation
    if (req.body.products?.length === 0) {
      return res.status(500).send({ error: "Not product in cart" });
    }
    let totalMoney = 0;
    req.body.products.forEach((product) => {
      totalMoney += product.price * product.quantity;
    });
    const orders = new orderModel({ ...req.body, payment: totalMoney });
    await orders.save();
    res.status(201).send({
      success: true,
      message: "Order Created Successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({ buyer: req.params.userId });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
