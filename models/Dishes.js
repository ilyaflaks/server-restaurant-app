const mongoose = require("mongoose");

const DishesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Dishes = mongoose.model("dishes", DishesSchema);

module.exports = Dishes;
