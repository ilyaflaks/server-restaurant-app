const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
  total: {
    type: Number,
  },
  sucess: {
    type: Boolean,
  },
});

const Orders = mongoose.model("orders", OrdersSchema);

module.exports = Orders;
